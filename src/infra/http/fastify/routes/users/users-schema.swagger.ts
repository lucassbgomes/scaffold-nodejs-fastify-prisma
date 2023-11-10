export const userRoleSchema = {
  $id: 'userRoleSchema',
  type: 'string',
  enum: ['ADMIN', 'MANAGER', 'SUPPORT', 'CLIENT'],
};

export const userResponseSchema = {
  $id: 'userResponseSchema',
  type: 'object',
  properties: {
    id: { type: 'string' },
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    user_name: { type: 'string' },
    email: { type: 'string' },
    role: { $ref: 'userRoleSchema#' },
    created_at: { type: 'string' },
    updated_at: { type: 'string', nullable: true },
    deleted_at: { type: 'string', nullable: true },
  },
};

export const usersResponseSchema = {
  $id: 'usersResponseSchema',
  type: 'object',
  properties: {
    users: {
      type: 'array',
      items: { $ref: 'userResponseSchema#' },
    },
  },
};

export const registerUserSchema = {
  tags: ['Users'],
  summary: 'Register a user',
  description: 'Register a new user to authenticate in the system',
  body: {
    type: 'object',
    required: ['first_name', 'last_name', 'user_name', 'email', 'password'],
    properties: {
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      user_name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      role: { $ref: 'userRoleSchema#' },
    },
  },
  response: {
    201: { description: 'Response success', $ref: 'noContentSchema#' },
    409: { description: 'Response error', $ref: 'messageResponseErrorSchema#' },
  },
};

export const getUserProfileSchema = {
  tags: ['Users'],
  summary: 'Get profile user',
  description: "Returns the logged in user's profile",
  security: [{ 'JWT token': [] }],
  response: {
    200: {
      type: 'object',
      description: 'Response success',
      properties: { user: { $ref: 'userResponseSchema#' } },
    },
    400: { description: 'Response error', $ref: 'messageResponseErrorSchema#' },
  },
};

export const fetchUsersSchema = {
  tags: ['Users'],
  summary: 'Fetch lots of users ',
  description:
    'Search returns from many registered users with pagination and filters',
  security: [{ 'JWT token': [] }],
  response: {
    200: { description: 'Response success', $ref: 'usersResponseSchema#' },
    400: { description: 'Response error', $ref: 'messageResponseErrorSchema#' },
  },
};

export const getUserByIdSchema = {
  tags: ['Users'],
  summary: 'Get user by id',
  description: 'Returns data for a specific user',
  security: [{ 'JWT token': [] }],
  response: {
    200: {
      type: 'object',
      description: 'Response success',
      properties: { user: { $ref: 'userResponseSchema#' } },
    },
    400: { description: 'Response error', $ref: 'messageResponseErrorSchema#' },
  },
};

export const editUserSchema = {
  tags: ['Users'],
  summary: 'Edit a user',
  description: 'Edit data for a specific user',
  body: {
    type: 'object',
    properties: {
      first_name: { type: 'string', nullable: true },
      last_name: { type: 'string', nullable: true },
      user_name: { type: 'string', nullable: true },
      email: { type: 'string', nullable: true },
      password: { type: 'string', nullable: true },
      role: { $ref: 'userRoleSchema#' },
    },
  },
  response: {
    204: { description: 'Response success', $ref: 'noContentSchema#' },
    400: { description: 'Response error', $ref: 'messageResponseErrorSchema#' },
    403: { description: 'Response error', $ref: 'messageResponseErrorSchema#' },
  },
};

export const deleteUserSchema = {
  tags: ['Users'],
  summary: 'Delete a user',
  description: 'Delete a specific user',
  response: {
    204: { description: 'Response success', $ref: 'noContentSchema#' },
    400: { description: 'Response error', $ref: 'messageResponseErrorSchema#' },
    403: { description: 'Response error', $ref: 'messageResponseErrorSchema#' },
  },
};
