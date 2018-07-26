import JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { classToPlain } from 'class-transformer';
dotenv.config();

/**
 * Wrapper for JWT
 */
export class JWTService {

  /**
   * Secret key
   */
  static JWT_TOKEN:string = process.env.JWT_SECRET;

  /**
   * Generate signed token
   */
  public static sign = async (payload: object) => {
    return await JWT.sign(await classToPlain(payload), JWTService.JWT_TOKEN);
  }

  /**
   * Verify Token
   */
  public static verify = async (token: string) => {
    return await JWT.verify(token, JWTService.JWT_TOKEN);
  }

}