import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError, ZodIssue } from 'zod';

import { env } from '@/infra/env';
import { error } from 'console';

export const errorHandler = (
  err: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  let message = 'Internal server err.';
  let code = 500;
  let issues: ZodIssue[] | null = null;

  if (err instanceof ZodError) {
    message = 'Validation error.';
    code = 400;
    issues = err.issues;
  } else if (err.code === 'FST_ERR_VALIDATION') {
    message = 'Validation error.';
    code = err.statusCode ?? 500;
    issues =
      err.validation?.map(
        (validation) =>
          ({
            code: Object.keys(validation.params)[0],
            expected: '',
            received: '',
            path: [Object.values(validation.params)[0]],
            message: validation.message ?? validation.keyword,
          }) as ZodIssue,
      ) ?? [];
  }

  if (env.NODE_ENV !== 'production' && err.code !== 'FST_ERR_VALIDATION') {
    error(err);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(code).send({ message, issues });
};
