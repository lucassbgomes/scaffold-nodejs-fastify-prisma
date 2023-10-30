import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Authenticate User Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const response = await request(app.server).post('/session').send({
      user_name: 'lucasgomes',
      password: '123456789',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  it('should not be able to authenticate with wrong password', async () => {
    await request(app.server).post('/users').send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const response = await request(app.server).post('/session').send({
      user_name: 'lucasgomes',
      password: 'wrong_password',
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      }),
    );
  });

  it('should not be able to authenticate without some required data', async () => {
    await request(app.server).post('/users').send({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucasgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const response = await request(app.server).post('/session').send({
      password: '123456789',
    });

    expect(response.statusCode).toEqual(400);
  });
});
