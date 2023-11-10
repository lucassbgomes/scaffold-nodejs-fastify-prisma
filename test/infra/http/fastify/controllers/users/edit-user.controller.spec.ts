import request from 'supertest';
import { randomUUID } from 'node:crypto';

import { app } from '@/infra/http/fastify/app';

import { createAndAuthenticateUser } from '@test/utils/users/create-and-authenticate-user';

let tokenAll: string;

describe('Edit User Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();

    const { token } = await createAndAuthenticateUser(app);
    tokenAll = token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to edit a user', async () => {
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${tokenAll}`)
      .send();

    const { user } = profileResponse.body;

    const editResponse = await request(app.server)
      .patch(`/users/${user.id}`)
      .set('Authorization', `Bearer ${tokenAll}`)
      .send({
        last_name: 'Edit',
      });

    const profileResponse2 = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${tokenAll}`)
      .send();

    expect(editResponse.statusCode).toEqual(204);
    expect(profileResponse2.body.user.last_name).toEqual('Edit');
  });

  it("should be able to edit a user's password", async () => {
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${tokenAll}`)
      .send();

    const { user } = profileResponse.body;

    await request(app.server)
      .patch(`/users/${user.id}`)
      .set('Authorization', `Bearer ${tokenAll}`)
      .send({
        password: 'password_edited',
      });

    const response = await request(app.server).post('/session').send({
      user_name: 'lucasgomes',
      password: 'password_edited',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  it('should not be able to edit with inexistent user id', async () => {
    const response = await request(app.server)
      .patch(`/users/${randomUUID()}`)
      .set('Authorization', `Bearer ${tokenAll}`)
      .send({
        password: 'password_edited',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      }),
    );
  });
});
