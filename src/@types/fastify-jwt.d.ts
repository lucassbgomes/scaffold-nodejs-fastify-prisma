// fastify-jwt.d.ts
import { UserRoleEnum } from '@/types/users';
import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      name: string;
      role: UserRoleEnum;
    };
  }
}
