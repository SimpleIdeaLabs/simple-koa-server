import { expect } from 'chai';
import supertest from 'supertest';
import { Container } from 'typedi';
import { Server } from '../Server';
import { Database } from '../database/Database';

const app = Container.get(Server).app;
const request = supertest(app.callback());
const db = Container.get(Database);

describe('User Api Test', async () => {

  let savedUser: any;
  let authHeader: any;

  before(async () => {
    await db.connect();
    await db.reset();

    // Generate Login Token
    const res = await request.post('/login').send({
      username: 'Admin',
      password: 'Password'
    });
    authHeader = { 'Authorization': res.body.token };
  });

  describe('User List', async() => {
    it('Should return list of users', async () => {
      const res = await request.get('/users').set(authHeader);
      expect(res.body.length).not.eql(0);
    });
  });
  
  describe('Create User', async () => {
    it('Should create user', async () => {
      const userData = {
        username: 'Mark Ernest',
        password: 'Matute',
        cpassword: 'Matute'
      };
      const res = await request.post('/users').send(userData).set(authHeader);
      savedUser = res.body;
      expect(savedUser.username).eql(userData.username);
      expect(savedUser.id).not.eql(undefined);
    });
  });

  describe('Single User', async () => {
    it('Should return single user', async () => {
      const res = await request.get(`/users/${savedUser.id}`).set(authHeader);
      expect(res.body.id).eql(savedUser.id);
    });
  });

  describe('Edit User', async () => {
    it('Should edit user', async () => {
      const userData = {
        username: 'Mark Ernest Updated',
        password: 'Matute',
        cpassword: 'Matute'
      };
      const res = await request.put(`/users/${savedUser.id}`).send(userData).set(authHeader);
      expect(res.body.username).eql(userData.username);
    });
  });
  
  describe('Delete User', async () => {
    it('Should delete user', async () => {
      const res = await request.delete(`/users/${savedUser.id}`).set(authHeader);
      expect(res.status).eql(200);
    });
  });

});