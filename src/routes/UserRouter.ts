import { Context } from 'koa';
import { User } from '../models/User';
import { plainToClass } from 'class-transformer';
import { BaseRouter } from '../libs/core/BaseRouter';
import { BCryptService } from '../services/BCryptService';
import { LoggedInOnly } from '../middlewares/LoggedInOnly';
import { RouterInterface } from '../libs/interface/RouterInterface';

/**
 * User Routes
 */
export class UserRouter extends BaseRouter implements RouterInterface {

  /**
   * Initialize
   */
  constructor() {
    super();
    this.setUpRoutes();
  }

  /**
   * Set Up routes
   */
  setUpRoutes(): void {
    this.router.prefix('/users');
    this.router.get('/', LoggedInOnly, this.showList);
    this.router.post('/', this.saveUser);
  }

  /**
   * User Lists
   * @param ctx 
   */
  public showList = async (ctx: Context): Promise<any> => {
    try {
      const users = await this.database.manager.find(User);
      ctx.status = this.responseCodes.SUCCESS;
      ctx.body = users;
    } catch(e) {
      console.log(e);
      ctx.status = this.responseCodes.INTERNAL_ERROR;
      ctx.body = { errors: e };
    }
  }

  /**
   * Save User
   */
  public saveUser = async(ctx: Context): Promise<any> => {
    try {
      // Convert to object
      const { username, password } = ctx.request.body;
      const userClass: any = await plainToClass(User, {
        username: username,
        password: await BCryptService.hash(password)
      });

      // Check for errors
      const errors = await userClass.validate({ groups: ['save'] });
      if (errors.length) {
        ctx.status = this.responseCodes.INVALID_DATA;
        ctx.body = { errors };
        return;
      }

      // Save
      ctx.status = this.responseCodes.NEW_RESOURCE;
      ctx.body = await this.database.manager.save(User, userClass);
    } catch (e) {
      console.log(e);
      ctx.status = this.responseCodes.INTERNAL_ERROR;
      ctx.body = { errors: e };
    }
  }

}