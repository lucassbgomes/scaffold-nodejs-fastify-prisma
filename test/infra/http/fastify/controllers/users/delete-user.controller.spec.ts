import request from 'supertest';

import { app } from '@/infra/http/fastify/app';

import { createAndAuthenticateUser } from '@test/utils/users/create-and-authenticate-user';

describe('Delete User Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to delete user by id', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN');

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    const { user } = profileResponse.body;

    const response = await request(app.server)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
