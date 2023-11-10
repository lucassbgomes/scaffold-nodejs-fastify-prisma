export const createSessionUserSchema = {
  tags: ['Session'],
  summary: 'Authenticate user',
  description: 'Creates a new session for user authentication',
  body: {
    type: 'object',
    required: ['user_name', 'password'],
    properties: {
      user_name: { type: 'string' },
      password: { type: 'string' },
    },
  },
  example: {
    user_name: 'test@test.com',
    password: 'test123',
  },
  response: {
    200: {
      type: 'object',
      description: 'Response success',
      properties: { token: { type: 'string' } },
    },
    404: {
      description: 'Response error',
      $ref: 'messageResponseErrorSchema#',
    },
  },
};

export const refreshTokenSessionUserSchema = {
  tags: ['Session'],
  summary: 'Refresh user session token',
  description:
    "To be able to refresh the user's token, they must have logged in and their token has expired, the refresh token is in the session Cookie on the server.",
  response: {
    200: {
      type: 'object',
      description: 'Response success',
      properties: { token: { type: 'string' } },
    },
    404: { description: 'Response error', $ref: 'messageResponseErrorSchema#' },
  },
};
