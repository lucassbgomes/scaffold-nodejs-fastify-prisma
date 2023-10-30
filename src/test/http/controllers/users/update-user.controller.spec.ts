import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

let tokenAll: string;

describe('Update User Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();

    const { token } = await createAndAuthenticateUser(app);
    tokenAll = token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to update a user', async () => {
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${tokenAll}`)
      .send();

    const { user } = profileResponse.body;

    const updateResponse = await request(app.server)
      .patch(`/users/${user.id}`)
      .set('Authorization', `Bearer ${tokenAll}`)
      .send({
        last_name: 'Edit',
      });

    const profileResponse2 = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${tokenAll}`)
      .send();

    expect(updateResponse.statusCode).toEqual(204);
    expect(profileResponse2.body.user.last_name).toEqual('Edit');
  });

  it("should be able to update a user's password", async () => {
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${tokenAll}`)
      .send();

    const { user } = profileResponse.body;

    await request(app.server)
      .patch(`/users/${user.id}`)
      .set('Authorization', `Bearer ${tokenAll}`)
      .send({
        password: 'password_updated',
      });

    const response = await request(app.server).post('/session').send({
      user_name: 'lucasgomes',
      password: 'password_updated',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  it('should not be able to update with inexistent user id', async () => {
    const response = await request(app.server)
      .patch('/users/inexistent-id')
      .set('Authorization', `Bearer ${tokenAll}`)
      .send({
        password: 'password_updated',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      }),
    );
  });
});
