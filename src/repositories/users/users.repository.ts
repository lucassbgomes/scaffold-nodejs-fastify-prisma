import {
  UserCreateData,
  UserData,
  UserUniqueData,
  UserUpdateData,
} from '@/types/users';

export interface UsersRepository {
  create(data: UserCreateData): Promise<UserData>;

  update(userId: string, data: UserUpdateData): Promise<UserData>;

  findByUnique(data: UserUniqueData): Promise<UserData | null>;

  findById(id: string): Promise<UserData | null>;

  findMany(): Promise<UserData[]>;

  delete(userId: string): Promise<void>;
}
