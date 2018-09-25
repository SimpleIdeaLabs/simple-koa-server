import { Roles } from '../database/models/Role';
import { User } from './../database/models/User';
import { ValidationError } from 'class-validator';
import { UserRepository } from './../database/repositories/User.repository';
import { Controller, Post, Body, Get, Param, Put, Delete, OnUndefined, Authorized, CurrentUser } from "routing-controllers";

@Controller('/users')
@Authorized([Roles.ADMIN])
export class UserController {

  constructor(
    private userRepository: UserRepository
  ) { }

  @Post('/')
  async saveUser(@CurrentUser({ required: true }) currentUser: User, @Body() user: User): Promise<User | ValidationError[]> {
    try {
      console.log(currentUser);
      return await this.userRepository.saveUser(user);
    } catch (error) {
      throw error;
    }
  }

  @Get('/')
  async getUsers(@CurrentUser({ required: true }) currentUser: User) {
    return this.userRepository.getUserList();
  }

  @Get('/:id')
  @OnUndefined(404)
  async getUser(@CurrentUser({ required: true }) currentUser: User, @Param('id') id: number) {
    return await this.userRepository.getUserById(id);
  }

  @Put('/:id')
  @OnUndefined(404)
  async updateUser(
    @CurrentUser({ required: true }) currentUser: User,
    @Param('id') id: number,
    @Body() user: User
  ) {
    return await this.userRepository.updateUser(id, user);
  }

  @Delete('/:id')
  async deleteUser(
    @CurrentUser({ required: true }) currentUser: User,
    @Param('id') id: number
  ) {
    return await this.userRepository.deleteUser(id);
  }

}