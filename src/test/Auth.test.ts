import { expect } from 'chai';
import supertest from 'supertest';
import { Container } from 'typedi';
import { Server } from '../Server';
import { Database } from './../database/Database';

const app = Container.get(Server).app;
const request = supertest(app.callback());
const db = Container.get(Database);

describe('Auth Api Test', async () => {

  before(async () => {
    await db.connect();
    await db.reset();
  });

  describe('Login', async () => {
    it('Should login user', async () => {
      const res = await request.post('/login').send({
        username: 'Guest',
        password: 'Password'
      });
      expect(res.body.token).not.to.be.eql(undefined);
    });
  });

});