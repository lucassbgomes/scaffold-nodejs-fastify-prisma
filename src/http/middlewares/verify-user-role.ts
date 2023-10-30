import { UserRoleEnum } from '@/types/users';
import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(roleToVerify: UserRoleEnum) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
  };
}
