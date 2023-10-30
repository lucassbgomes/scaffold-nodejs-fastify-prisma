import {
  UserCreateData,
  UserData,
  UserUniqueData,
  UserUpdateData,
} from '@/types/users';
import { UsersRepository } from '../users.repository';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public users: Map<string, UserData> = new Map();

  async create({
    first_name,
    last_name,
    user_name,
    email,
    password,
  }: UserCreateData): Promise<UserData> {
    const user: UserData = {
      id: randomUUID(),
      first_name,
      last_name,
      user_name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    this.users.set(user.id, user);

    return user;
  }

  async update(userId: string, data: UserUpdateData): Promise<UserData> {
    const user = this.users.get(userId)!;

    const userUpdated: UserData = {
      ...user,
      ...data,
      updated_at: new Date(),
    };

    this.users.set(userId, userUpdated);

    return userUpdated;
  }

  async findByUnique({
    email,
    user_name,
  }: UserUniqueData): Promise<UserData | null> {
    let userFound: UserData | null = null;

    this.users.forEach((user) => {
      if (user.email === email || user.user_name === user_name) {
        userFound = user;
      }
    });

    return userFound;
  }

  async findById(id: string): Promise<UserData | null> {
    const user = this.users.get(id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findMany(): Promise<UserData[]> {
    const users = Array.from(this.users.entries()).map((user) => ({
      ...user[1],
    }));

    return users;
  }

  async delete(userId: string) {
    this.users.delete(userId);
  }
}
