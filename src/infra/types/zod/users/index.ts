import { z } from 'zod';

import { RegisterUserUseCaseRequest } from '@/domain/website/application/use-cases/users/register-user.usecase';
import { UserEntityRole } from '@/domain/website/enterprise/entities/user/user.types';

const userRole: z.ZodType<UserEntityRole> = z.enum([
  'ADMIN',
  'MANAGER',
  'SUPPORT',
  'CLIENT',
]);

const registerUserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: userRole.default('CLIENT'),
});

const editUserSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  user_name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: userRole.optional(),
});

const paramsUserSchema = z.object({
  id: z.string().uuid(),
});

const queryParamsUserSchema = z.object({
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
});

type EditUserRequest = z.infer<typeof editUserSchema>;

export type UserParamsRequest = z.infer<typeof paramsUserSchema>;
export type UserQueryParamsRequest = z.infer<typeof queryParamsUserSchema>;

export const parseRegisterUserBodySchema = (
  body: unknown,
): RegisterUserUseCaseRequest => {
  return registerUserSchema.parse(body);
};

export const parseEditUserBodySchema = (body: unknown): EditUserRequest => {
  return editUserSchema.parse(body);
};

export const parseUserParamsRequestSchema = (
  params: unknown,
): UserParamsRequest => {
  return paramsUserSchema.parse(params);
};

export const parseUserQueryParamsRequestSchema = (
  query: unknown,
): UserQueryParamsRequest => {
  return queryParamsUserSchema.parse(query);
};
