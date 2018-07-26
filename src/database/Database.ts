import moment from 'moment';
import { createConnection, Connection, getConnection, EntityManager } from 'typeorm';

// Seeders
import { UserSeed } from './seeds/UserSeed';

/**
 * Database Wrapper
 */
export class Database {

  /**
   * Connection Instance
   */
  public con: Connection;

  /**
   * Entity Manager Instance
   */
  public manager: EntityManager;

  /**
   * Initialize
   */
  constructor() { }

  /**
   * Connect to MySQL
   */
  public connect = async () => {
    try {
      if (!this.con) {
        this.con = await createConnection();
      }
      this.manager = this.con.manager;
      return this.con;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  /**
   * Prune Database
   */
  public reset = async () => {
    try {
      await this.con.synchronize(true);
    } catch(e) {
      console.log(e);
      throw new Error(e);
    }
  }

  /**
   * Seed Data
   */
  public seed = async () => {
    try {
      await new UserSeed().execute();
    } catch(e) {
      console.log(e);
      throw new Error(e);
    }
  }

}

export default new Database();
