import request from 'supertest';

import { app } from '@/infra/http/fastify/app';
import { createAndAuthenticateUser } from '@test/utils/users/create-and-authenticate-user';

describe('Get User Profile Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'lucas.sbgomes@gmail.com',
      }),
    );
  });
});
