import request from 'supertest';

import { app } from '@/infra/http/fastify/app';

import { createAndAuthenticateUser } from '@test/utils/users/create-and-authenticate-user';

describe('Fetch Users Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to fetch many users', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.users.length).toEqual(1);
  });
});
