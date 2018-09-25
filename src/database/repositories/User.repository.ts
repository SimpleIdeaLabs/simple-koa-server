import { Service } from 'typedi';
import { User } from '../models/User';
import { ValidationError } from 'class-validator';
import { EntityManager, DeleteResult } from 'typeorm';
import { JWTService } from './../../services/JWT.service';
import { InjectManager } from 'typeorm-typedi-extensions';
import { BCryptService } from './../../services/BCrypt.service';

@Service()
export class UserRepository {

  constructor(
    @InjectManager() private manager: EntityManager,
    private jwtService: JWTService,
    private bCryptService: BCryptService
  ) {}

  async login(user: User): Promise<Object | undefined> {
    try {

      const userRes = await this.manager.findOne(User, {
        username: user.username,
      }, {
        relations: ['roles']
      });
      if (!userRes) return undefined;

      const passwordMatch = await this.bCryptService.compare(user.password, userRes.password);
      if (!passwordMatch) return undefined;

      delete userRes.password;
      return { 
        token: await this.jwtService.sign(userRes) 
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserList(): Promise<User[] | undefined> {
    return await this.manager.find(User);
  }

  async getUserById(id: number): Promise<User | undefined > {
    try {
      return await this.manager.findOne(User, id, { relations: ['roles']});
    } catch (error) {
      throw error;
    }
  }

  async saveUser(user: User): Promise<User | ValidationError[]> {
    try {
      const errors = await user.validate({groups: ['save']});
      if(errors && errors.length) return errors;
      user.password = await this.bCryptService.hash(user.password);
      const responseUser = await this.manager.save(User, user);
      delete responseUser.password;
      return responseUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, updatedUser: User): Promise<User | ValidationError[]> {
    try {
      updatedUser.id = id;
      const errors = await updatedUser.validate({ groups: ['update'] });
      if (errors && errors.length) return errors;
      const user = await this.manager.findOne(User, id, {
        select: ['id']
      });
      if (!user) return undefined;
      Object.assign(user, updatedUser);
      return await this.manager.save(user);
    } catch (error) {
      throw error
    }
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    try {
      return await this.manager.delete(User, id);
    } catch (error) {
      throw error;
    }
  }

}