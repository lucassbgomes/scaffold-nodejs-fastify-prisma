import { FastifyReply, FastifyRequest } from 'fastify';

export async function refreshTokenUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({ onlyCookie: true });

  const { sub, name, role } = request.user;

  const token = await reply.jwtSign(
    {
      name,
      role,
    },
    {
      sign: {
        sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {
      name,
      role,
    },
    {
      sign: {
        sub,
        expiresIn: '7d', // 7 days
      },
    },
  );

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}