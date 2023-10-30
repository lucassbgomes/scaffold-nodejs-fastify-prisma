import { beforeEach, describe, expect, it } from 'vitest';

import { RegisterUserUseCase } from '@/use-cases/users/register-user.usecase';
import { InMemoryUsersRepository } from '@/repositories/users/in-memory/in-memory.repository';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from '@/errors/users/user-already-exists.error';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserUseCase;

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserUseCase(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    });

    const isPasswordCorrectlyHashed = await compare('123456789', user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'lucas.sbgomes@gmail.com';

    await sut.execute({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email,
      password: '123456789',
    });

    await expect(() =>
      sut.execute({
        first_name: 'Lucas',
        last_name: 'Gomes',
        user_name: 'lucassbgomes',
        email,
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should be able to register to many users', async () => {
    const user1 = {
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456789',
    };

    const user2 = {
      first_name: 'Paulo',
      last_name: 'Gomes',
      user_name: 'paulopfgomes',
      email: 'paulo.pfgomes@gmail.com',
      password: '123456789',
    };

    const { user: responseUser1 } = await sut.execute({
      ...user1,
    });

    const { user: responseUser2 } = await sut.execute({
      ...user2,
    });

    expect(responseUser1.id).toEqual(expect.any(String));
    expect(responseUser2.id).toEqual(expect.any(String));
  });
});
