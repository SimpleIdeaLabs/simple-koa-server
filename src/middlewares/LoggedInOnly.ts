import { Context } from "koa";
import { User } from '../models/User';
import Database from '../database/Database';
import { plainToClass } from 'class-transformer';
import { JWTService } from '../services/JWTService';

/**
 * Returns 401 - Unauthorized
 * @param ctx 
 */
const sendUnauthorized = async (ctx: Context) => {
  ctx.status = 401;
  ctx.body = 'Unauthorized';
}

/**
 * Middleware to restrict
 * routes for logged in users only
 * @param ctx 
 * @param next 
 */
export const LoggedInOnly = async (ctx: Context, next: any ) => {
  try {
    if (ctx.headers && ctx.headers.authorization) {
      const token = ctx.headers.authorization;
      const decoded: User = await plainToClass(User, await JWTService.verify(token));
      const userExists = await Database.manager.findOne(User, decoded.id);
      if (!userExists) return sendUnauthorized(ctx); 
      await next();
      return;
    }
    return sendUnauthorized(ctx);
  } catch(e) {
    console.log(e);
    return sendUnauthorized(ctx); 
  }
}
