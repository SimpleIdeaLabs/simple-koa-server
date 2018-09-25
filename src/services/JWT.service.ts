import JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Service } from 'typedi';
import { User } from './../database/models/User';
import { classToPlain, plainToClass } from 'class-transformer';

dotenv.config();

@Service()
export class JWTService {

  private readonly JWT_TOKEN: string = process.env.JWT_SECRET;

  public async sign(payload: object): Promise<string> {
    return await JWT.sign(await classToPlain(payload), this.JWT_TOKEN);
  }

  public async verify (token: string): Promise<User> {
    return await plainToClass(User, JWT.verify(token, this.JWT_TOKEN));
  }

}