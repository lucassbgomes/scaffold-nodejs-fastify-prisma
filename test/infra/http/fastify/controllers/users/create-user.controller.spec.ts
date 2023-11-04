import request from 'supertest';

import { app } from '@/infra/http/fastify/app';

describe('Create User Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app.server).post('/users').send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    expect(response.statusCode).toEqual(201);
  });

  it('should not be able to create a new user without some required data', async () => {
    const response = await request(app.server).post('/users').send({
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    expect(response.statusCode).toEqual(400);
  });
});
