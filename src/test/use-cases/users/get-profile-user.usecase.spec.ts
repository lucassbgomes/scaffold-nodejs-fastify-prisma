import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/users/in-memory/in-memory.repository';
import { hash } from 'bcryptjs';
import { GetProfileUserUseCase } from '@/use-cases/users/get-profile-user.usecase';
import { ResourceNotFoundError } from '@/errors/users/resource-not-found.error';

let usersRepository: InMemoryUsersRepository;
let sut: GetProfileUserUseCase;

describe('Get Profile User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetProfileUserUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: await hash('123456789', 5),
    });

    const profileResponse = await sut.execute({ id: createdUser.id });

    expect(profileResponse).not.toBeNull();
    expect(profileResponse).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          first_name: 'Lucas',
          last_name: 'Gomes',
        }),
      }),
    );
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
