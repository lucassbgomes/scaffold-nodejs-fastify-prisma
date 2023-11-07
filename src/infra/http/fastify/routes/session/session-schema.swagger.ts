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
  response: {
    200: { type: 'object', properties: { token: { type: 'string' } } },
    404: { $ref: 'messageResponseSchema#' },
  },
};

export const refreshTokenSessionUserSchema = {
  tags: ['Session'],
  summary: 'Refresh user session token',
  description: 'Refresh user session token',
  response: {
    200: { type: 'object', properties: { token: { type: 'string' } } },
    404: { $ref: 'messageResponseSchema#' },
  },
};
