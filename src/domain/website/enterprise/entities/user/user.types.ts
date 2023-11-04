export type UserEntityRole = 'ADMIN' | 'MANAGER' | 'SUPPORT' | 'CLIENT';

export type UserEntityUniqueData = {
  user_name: string;
  email: string;
};

export type UserEntityData = UserEntityUniqueData & {
  first_name: string;
  last_name: string;
  password: string;
  role: UserEntityRole;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type UserEntityProps = UserEntityData;

export type UserEntityResponseData = {
  id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  role: UserEntityRole;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
