import { InMemoryUsersRepository } from '@test/domain/website/application/repositories/users';
import { makeUser } from '@test/domain/website/application/factories/users';

import { NotAllowedError, ResourceNotFoundError } from '@/core/errors';

import { EditUserUseCase } from '@/domain/website/application/use-cases/users/edit-user.usecase';

let usersRepository: InMemoryUsersRepository;
let sut: EditUserUseCase;

describe('Edit User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new EditUserUseCase(usersRepository);
  });

  it('should be able to edit a user', async () => {
    const registerUser = makeUser();

    await usersRepository.create(registerUser);

    const result = await sut.execute({
      loggedUserId: registerUser.id.toString(),
      loggedUserRole: registerUser.role,
      data: { id: registerUser.id.toString(), first_name: 'Name Edited' },
    });

    expect(result.isRight()).toEqual(true);
    expect(usersRepository.items[0].first_name).toEqual('Name Edited');
  });

  it('should be possible to edit email or username if the user is an administrator', async () => {
    const registerUser = makeUser({ role: 'ADMIN' });
    await usersRepository.create(registerUser);

    const email = 'lucas@gomes.eti.br';
    const user_name = 'lucasgomes';

    const result = await sut.execute({
      loggedUserId: registerUser.id.toString(),
      loggedUserRole: registerUser.role,
      data: { id: registerUser.id.toString(), email, user_name },
    });

    expect(result.isRight()).toEqual(true);
    expect(usersRepository.items[0].email).toEqual(email);
    expect(usersRepository.items[0].user_name).toEqual(user_name);
  });

  it('should not be able editing email or user_name if you are not admin', async () => {
    const email = 'lucas@gomes.eti.br';
    const user_name = 'lucasgomes';

    const registerUser = makeUser({ email, user_name });

    await usersRepository.create(registerUser);

    const result = await sut.execute({
      loggedUserId: registerUser.id.toString(),
      loggedUserRole: registerUser.role,
      data: {
        id: registerUser.id.toString(),
        email: 'lucas@gmail.com',
        user_name: 'lucas.gomes',
      },
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
    expect(usersRepository.items[0].email).toEqual(email);
    expect(usersRepository.items[0].user_name).toEqual(user_name);
  });

  it("should not be possible to edit a user that doesn't exist", async () => {
    const result = await sut.execute({
      loggedUserId: 'id-inexistent-admin',
      loggedUserRole: 'ADMIN',
      data: { id: 'id-inexistent-user' },
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
