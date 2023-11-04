import request from 'supertest';
import { randomUUID } from 'crypto';

import { app } from '@/infra/http/fastify/app';

import { createAndAuthenticateUser } from '@test/utils/users/create-and-authenticate-user';

let tokenUser: string;

describe('Get User By ID Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();

    const { token } = await createAndAuthenticateUser(app);
    tokenUser = token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user by id', async () => {
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send();

    const { user: userProfile } = profileResponse.body;

    const response = await request(app.server)
      .get(`/users/${userProfile.id}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send();

    const { user } = response.body;

    expect(response.statusCode).toEqual(200);
    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should not be able to get user by id inexistent', async () => {
    const response = await request(app.server)
      .get(`/users/${randomUUID()}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send();

    const { error, message } = response.body;

    expect(response.statusCode).toEqual(400);
    expect(error).toEqual('ResourceNotFoundError');
    expect(message).toEqual('Resource not found');
  });
});
