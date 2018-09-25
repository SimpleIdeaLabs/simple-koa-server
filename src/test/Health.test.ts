import { expect } from 'chai';
import supertest from 'supertest';
import { Container } from 'typedi';
import { Server } from '../Server';

const app = Container.get(Server).app;
const request = supertest(app.callback());

describe('Health Test', async() => {
  it('It should return healthy', async () => {
    const res = await request.get('/health');
    expect(res.text).to.be.eql('healthy');
  });
});