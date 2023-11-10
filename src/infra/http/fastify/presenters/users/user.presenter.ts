import { UserEntity } from '@/domain/website/enterprise/entities';

export class UserPresenter {
  static toJson(user: UserEntity) {
    return {
      id: user.id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_name: user.user_name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
      role: user.role,
    };
  }
}
