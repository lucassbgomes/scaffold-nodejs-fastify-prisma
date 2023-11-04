import { PaginationParams } from '@/core/types/pagination-params';
import { UsersRepository } from '@/domain/website/application/repositories';
import { UserEntity } from '@/domain/website/enterprise/entities';
import { UserEntityUniqueData } from '@/domain/website/enterprise/entities/user/user.types';

export default class InMemoryUsersRepository implements UsersRepository {
  public items: UserEntity[] = [];

  async findById(id: string): Promise<UserEntity | null> {
    const user = this.items.find((item) => item.id.toString() === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByUnique({
    email,
    user_name,
  }: UserEntityUniqueData): Promise<UserEntity | null> {
    const user = this.items.find(
      (item) => item.email === email || item.user_name === user_name,
    );

    if (!user) {
      return null;
    }

    return user;
  }

  async findMany({ page, size = 20 }: PaginationParams): Promise<UserEntity[]> {
    const users = this.items.slice((page - 1) * size, page * size);

    return users;
  }

  async create(user: UserEntity) {
    this.items.push(user);
  }

  async save(user: UserEntity) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id);

    this.items[itemIndex] = user;
  }

  async delete(user: UserEntity) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id);

    this.items.splice(itemIndex, 1);
  }
}
