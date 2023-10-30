import { z } from 'zod';
import { UserRole } from 'prisma/prisma-client';

const userRole = z.nativeEnum(UserRole);

const userDataSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: userRole,
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
});

const userCreateSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: userRole.default('USER'),
});

const userUpdateSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  user_name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: userRole.optional(),
});

const userUniqueSchema = z
  .object({
    user_name: z.string(),
    email: z.string().email(),
  })
  .partial()
  .refine(
    ({ user_name, email }) => user_name !== undefined || email !== undefined,
    { message: 'On of the fields mus be defined ' },
  );

const userParamsSchema = z.object({
  id: z.string().uuid(),
});

const userAuthenticateSchema = z.object({
  user_name: z.string().min(1),
  password: z.string(),
});

export type UserRoleEnum = UserRole;

export type UserData = z.infer<typeof userDataSchema>;
export type UserDataResponse = { user: UserData };

export type UserDataWithoutPassword = Omit<UserData, 'password'>;

export type UserCreateData = z.infer<typeof userCreateSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;

export type UserParamsData = z.infer<typeof userParamsSchema>;
export type UserUniqueData = z.infer<typeof userUniqueSchema>;
export type UserWhereData = Partial<UserData>;

export type UserAuthenticateRequest = z.infer<typeof userAuthenticateSchema>;
export type UserAuthenticateResponse = { user: UserDataWithoutPassword };

export type UserResponse = { user: UserDataWithoutPassword } | null;
export type UsersResponse = { users: UserDataWithoutPassword[] };

export const parseUserBodyPostSchema = (body: unknown): UserCreateData => {
  return userCreateSchema.parse(body);
};

export const parseUserParamsSchema = (params: unknown): UserParamsData => {
  return userParamsSchema.parse(params);
};

export const parseUserBodyPatchSchema = (body: unknown): UserUpdateData => {
  return userUpdateSchema.parse(body);
};

export const parseUserBodyAuthenticateSchema = (
  body: unknown,
): UserAuthenticateRequest => {
  return userAuthenticateSchema.parse(body);
};
