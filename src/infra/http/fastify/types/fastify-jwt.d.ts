// fastify-jwt.d.ts
import '@fastify/jwt';

import { UserEntityRole } from '@/domain/website/enterprise/entities/user/user.types';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      name: string;
      role: UserEntityRole;
    };
  }
}
