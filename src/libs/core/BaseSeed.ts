import Database, { Database as DBClass } from '../../database/Database';

/**
 * Base Class for All Seeds
 */
export class BaseSeed {

  /**
   * Database Instance for Seeders
   */
  public database: DBClass;

  /**
   * Initialize
   */
  constructor() {
    this.database = Database;
  }
}