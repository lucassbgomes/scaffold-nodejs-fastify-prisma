import request from 'supertest';

import { app } from '@/infra/http/fastify/app';

describe('Refresh Token User Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const authResponse = await request(app.server).post('/session').send({
      user_name: 'lucasgomes',
      password: '123456789',
    });

    const cookies = authResponse.get('Set-Cookie');

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});
