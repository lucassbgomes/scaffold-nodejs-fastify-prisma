import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { UserEntityProps, UserEntityRole } from './user.types';

export default class UserEntity extends Entity<UserEntityProps> {
  get first_name() {
    return this.props.first_name;
  }

  get last_name() {
    return this.props.last_name;
  }

  get user_name() {
    return this.props.user_name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  get deleted_at() {
    return this.props.deleted_at;
  }

  protected touch() {
    this.props.updated_at = new Date();
  }

  set first_name(first_name: string) {
    this.props.first_name = first_name;
    this.touch();
  }

  set last_name(last_name: string) {
    this.props.last_name = last_name;
    this.touch();
  }

  set user_name(user_name: string) {
    this.props.user_name = user_name;
    this.touch();
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  set role(role: UserEntityRole) {
    this.props.role = role;
    this.touch();
  }

  set deleted_at(deleted_at: Date | undefined) {
    this.props.deleted_at = deleted_at;
    this.touch();
  }

  static create<T>(
    props: Optional<UserEntityProps, 'created_at' | 'role'>,
    id?: UniqueEntityID,
  ) {
    const user = new UserEntity(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        role: props.role ?? 'CLIENT',
      },
      id,
    );

    return user;
  }
}
