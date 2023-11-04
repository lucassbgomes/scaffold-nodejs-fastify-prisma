import { hash } from 'bcryptjs';

import { InMemoryUsersRepository } from '@test/domain/website/application/repositories/users';
import { makeUser } from '@test/domain/website/application/factories/users';

import { CreateSessionUserUseCase } from '@/domain/website/application/use-cases/session/create-session-user.usecase';

let usersRepository: InMemoryUsersRepository;
let sut: CreateSessionUserUseCase;

describe('Create Session User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateSessionUserUseCase(usersRepository);
  });

  it('should be able to create session', async () => {
    const password = '123456';
    const password_hash = await hash(password, 5);

    const user = makeUser({ password: password_hash });

    await usersRepository.create(user);

    const result = await sut.execute({
      user_name: user.email,
      password,
    });

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
  });

  it('should not be able to create session with wrong email or username', async () => {
    const result = await sut.execute({
      user_name: 'lucassbgomes',
      password: '123456789',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.isRight()).toEqual(false);
  });

  it('should not be able to create session with wrong password', async () => {
    const user = makeUser();

    await usersRepository.create(user);

    const result = await sut.execute({
      user_name: user.email,
      password: '123456',
    });

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
  });
});
