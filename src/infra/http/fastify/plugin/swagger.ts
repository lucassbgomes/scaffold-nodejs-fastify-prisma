import swagger, { SwaggerOptions } from '@fastify/swagger';

const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: 'API title',
      description: 'A description of the API.',
      version: '2.0.0',
    },
    host: 'localhost',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
};

export { swagger, swaggerOptions };
