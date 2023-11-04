import { hash } from 'bcryptjs';

import { InMemoryUsersRepository } from '@test/domain/website/application/repositories/users';
import { makeUser } from '@test/domain/website/application/factories/users';

import { NotAllowedError, ResourceNotFoundError } from '@/core/errors';

import { DeleteUserUseCase } from '@/domain/website/application/use-cases/users/delete-user.usecase';

let usersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe('Delete User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to delete a user by id', async () => {
    const password = '123456';
    const password_hash = await hash(password, 5);

    const createUser = makeUser({
      password: password_hash,
      role: 'ADMIN',
    });

    await usersRepository.create(createUser);

    const result = await sut.execute({ userId: createUser.id.toString() });

    expect(result.isRight()).toEqual(true);
  });

  it("should not be possible to delete a user that doesn't exist", async () => {
    const result = await sut.execute({ userId: 'id-inexistent' });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be possible to delete a user who is not an administrator', async () => {
    const password = '123456';
    const password_hash = await hash(password, 5);

    const createUser = makeUser({
      password: password_hash,
    });

    await usersRepository.create(createUser);

    const result = await sut.execute({ userId: createUser.id.toString() });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
