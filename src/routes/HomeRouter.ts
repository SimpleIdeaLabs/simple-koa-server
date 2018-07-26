import { Context } from 'koa';
import { BaseRouter } from '../libs/core/BaseRouter';
import { RouterInterface } from '../libs/interface/RouterInterface';

/**
 * Home Routes
 */
export class HomeRouter extends BaseRouter implements RouterInterface {

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
  setUpRoutes():void {
    this.router.get('/', this.showHome);
  }

  /**
   * Show home
   * @param ctx 
   */
  async showHome(ctx: Context) {
    const htmlBody = `
      <div style="padding:50px;">
        <h4> Routes </h4>
        <hr />
        <p>/auth/login -> POST </p>
        <small>Payload:</small>
        <code>
          {
            username: 'test',
            password: 'test'
          }
        </code>
        <hr />
        <p>/users -> GET </p>
        <hr />
        <p>/users -> POST </p>
        <small>Payload:</small>
        <code>
          {
            username: 'test',
            password: 'test'
          }
        </code>
      </div>`;
    ctx.body = htmlBody;
  }

}