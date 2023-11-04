import { InMemoryUsersRepository } from '@test/domain/website/application/repositories/users';
import { makeUser } from '@test/domain/website/application/factories/users';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { FetchUsersUseCase } from '@/domain/website/application/use-cases/users/fetch-users.usecase';

let usersRepository: InMemoryUsersRepository;
let sut: FetchUsersUseCase;

describe('Get Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new FetchUsersUseCase(usersRepository);
  });

  it('should be able to fetch many users', async () => {
    const sizeUsers = 3;

    for (let i = 1; i <= sizeUsers; i++) {
      await usersRepository.create(
        makeUser({ id: new UniqueEntityID(`user-${i}`) }),
      );
    }

    const result = await sut.execute({ page: 1 });

    expect(result.value?.users).toHaveLength(sizeUsers);
  });

  it('should be able to fetch paginated users', async () => {
    const sizeUsers = 22;

    for (let i = 1; i <= sizeUsers; i++) {
      await usersRepository.create(
        makeUser({ id: new UniqueEntityID(`user-${i}`) }),
      );
    }

    const result = await sut.execute({ page: 2 });

    expect(result.value?.users).toHaveLength(2);
  });

  it('should be able to fetch for paginated users, changing the size of results per page', async () => {
    const sizeUsers = 20;

    for (let i = 1; i <= sizeUsers; i++) {
      await usersRepository.create(
        makeUser({ id: new UniqueEntityID(`user-${i}`) }),
      );
    }

    const result = await sut.execute({ size: 10, page: 2 });

    expect(result.value?.users).toHaveLength(10);
  });

  it('should be able to fetch no users', async () => {
    const result = await sut.execute({ page: 1 });

    expect(result.value?.users).toHaveLength(0);
  });
});
