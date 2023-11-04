import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { UserEntity } from '@/domain/website/enterprise/entities';

export default function makeUser(
  override: Partial<UserEntity> = {},
  id?: UniqueEntityID,
) {
  const user = UserEntity.create(
    {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      user_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return user;
}
