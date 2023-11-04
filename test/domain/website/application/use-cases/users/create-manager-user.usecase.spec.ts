import { compare } from 'bcryptjs';

import { makeUser } from '@test/domain/website/application/factories/users';
import { InMemoryUsersRepository } from '@test/domain/website/application/repositories/users';

import { UserAlreadyExistsError } from '@/core/errors';

import { CreateUserUseCase } from '@/domain/website/application/use-cases/users/create-user.usecase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to create a user', async () => {
    const user_name = 'lucassbgomes';

    const { isLeft, isRight } = await sut.execute({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name,
      email: 'lucas.sbgomes@gmail.com',
      password: '123456',
    });

    expect(isRight()).toEqual(true);
    expect(isLeft()).toEqual(false);
  });

  it("should be able to hash the user's password upon registration", async () => {
    await sut.execute({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email: 'lucas.sbgomes@gmail.com',
      password: '123456',
    });

    const user = inMemoryUsersRepository.items[0];

    const isPasswordCorrectlyHashed = await compare('123456', user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to crate with same email twice', async () => {
    const email = 'lucas.sbgomes@gmail.com';

    const user = makeUser({ email });
    await inMemoryUsersRepository.create(user);

    const { isLeft, isRight, value } = await sut.execute({
      first_name: 'Lucas',
      last_name: 'Gomes',
      user_name: 'lucassbgomes',
      email,
      password: '123456789',
    });

    expect(isRight()).toEqual(false);
    expect(isLeft()).toEqual(true);
    expect(value).toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should be able to create to many users', async () => {
    const userMake1 = makeUser();
    const user1 = {
      first_name: userMake1.first_name,
      last_name: userMake1.last_name,
      user_name: userMake1.user_name,
      email: userMake1.email,
      password: userMake1.password,
    };

    const userMake2 = makeUser();
    const user2 = {
      first_name: userMake2.first_name,
      last_name: userMake2.last_name,
      user_name: userMake2.user_name,
      email: userMake2.email,
      password: userMake2.password,
    };

    const result1 = await sut.execute({ ...user1 });
    const result2 = await sut.execute({ ...user2 });

    if (result1.isRight()) {
      expect(inMemoryUsersRepository.items[0]).toEqual(result1.value.user);
    }

    if (result2.isRight()) {
      expect(inMemoryUsersRepository.items[1]).toEqual(result2.value.user);
    }

    expect(inMemoryUsersRepository.items.length).toEqual(2);
  });
});
