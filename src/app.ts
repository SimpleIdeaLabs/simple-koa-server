import Koa from 'koa';
import KoaLogger from 'koa-logger';
import KoaBodyParser from 'koa-bodyparser';

// Routes
import { HomeRouter } from './routes/HomeRouter';
import { UserRouter } from './routes/UserRouter';
import { AuthRouter } from './routes/AuthRouter';

/**
 * Wrapper for the Koa App
 */
export class App {
  
  /**
   * Koa Instance
   */
  public app: any;

  /**
   * Initialize
   */
  constructor() {
    this.app = new Koa();
    this.loadMiddlewares();
    this.loadRoutes();
  }

  /**
   * Load necessary middlewares
   */
  loadMiddlewares() {
    this.app.use(KoaBodyParser());
    this.app.use(KoaLogger());
  }

  /**
   * Load all routes
   */
  loadRoutes() {
    this.app.use(new HomeRouter().router.routes());
    this.app.use(new UserRouter().router.routes());
    this.app.use(new AuthRouter().router.routes());
  }

}
