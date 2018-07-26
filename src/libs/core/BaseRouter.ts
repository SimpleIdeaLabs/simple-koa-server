import KoaRouter from 'koa-router';
import { ResponseCodes } from '../../constants/ResponseCodes';
import Database, { Database as DBClass } from '../../database/Database'; 

/**
 * Base Class for All Routers
 */
export class BaseRouter {
  
  /**
   * Koa Router Instance
   */
  public router: KoaRouter;

  /**
   * Database Instance
   */
  public database: DBClass;

  /**
   * Map of Response Codes
   */
  public responseCodes: any;

  /**
   * Initialize
   */
  constructor() {
    this.router = new KoaRouter();
    this.database = Database;
    this.responseCodes = ResponseCodes;
  }

}
