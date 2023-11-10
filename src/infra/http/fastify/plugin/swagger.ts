import swagger, { SwaggerOptions } from '@fastify/swagger';

const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: 'API title',
      description: 'A description of the API.',
      version: '2.0.0',
      contact: {
        name: 'Lucas Santa Bárbara Gomes',
        email: 'lucas.sbgomes@gmil.com',
        url: 'https://gomes.eti.br',
      },
    },
    host: 'localhost',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      'JWT token': {
        description: 'JWT Token - Authorization Bearer',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    swagger: '2.0',
  },
};

export { swagger, swaggerOptions };
