import { InMemoryUsersRepository } from '@test/domain/website/application/repositories/users';
import { makeUser } from '@test/domain/website/application/factories/users';

import { ResourceNotFoundError } from '@/core/errors';

import { GetUserProfileUseCase } from '@/domain/website/application/use-cases/users/get-user-profile.usecase';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const user = makeUser();

    await usersRepository.create(user);

    const result = await sut.execute({ userId: user.id.toString() });

    expect(result.isRight()).toEqual(true);

    if (result.isRight()) {
      expect(result.value.user.id.toString()).toEqual(user.id.toString());
    }
  });

  it('should not be able to get user profile with wrong id', async () => {
    const result = await sut.execute({ userId: 'inexistent-id' });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
