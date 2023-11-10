const messageResponseErrorSchema = {
  $id: 'messageResponseErrorSchema',
  type: 'object',
  properties: {
    error: { type: 'string' },
    message: { type: 'string' },
  },
};

export default messageResponseErrorSchema;
