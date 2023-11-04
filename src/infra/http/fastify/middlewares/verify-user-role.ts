import { FastifyReply, FastifyRequest } from 'fastify';

import { UserEntityRole } from '@/domain/website/enterprise/entities/user/user.types';

export function verifyUserRole(roleToVerify: UserEntityRole) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
  };
}
