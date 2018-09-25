import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { Container } from 'typedi';
import { User } from './models/User';
import { Role, Roles } from './models/Role';
import { BCryptService } from './../services/BCrypt.service';
import { useContainer, Connection, createConnection } from 'typeorm';

dotenv.config();

export class Database {

  public connection: Connection;
  private bCryptService: BCryptService;

  constructor() {
    this.bCryptService = Container.get(BCryptService);
  }

  public async connect(): Promise<void> {
    try {
      if (this.connection) return;
      useContainer(Container);
      this.connection = await createConnection();
    } catch (error) {
      throw error;
    }
  }

  public async seed(): Promise<void> {
    try {
      const guestRole = await this.connection.createEntityManager().save(Role, { name: Roles.GUEST });
      const adminRole = await this.connection.createEntityManager().save(Role, { name: Roles.ADMIN });
      await this.connection.createEntityManager().save(User, {
        username: 'Guest',
        password: await this.bCryptService.hash('Password'),
        roles: [guestRole]
      });
      await this.connection.createEntityManager().save(User, {
        username: 'Admin',
        password: await this.bCryptService.hash('Password'),
        roles: [adminRole]
      });
    } catch (error) {
      throw error;
    }
  }

  public async reset(): Promise<void> {
    try {
      for (let meta of this.connection.entityMetadatas) {
        await this.connection.manager.delete(meta.name, {});
     }
      await this.seed();
    } catch (error) {
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      return await this.connection.close();
    } catch (error) {
      throw error;
    }
  }

}
