import swaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

const swaggerUiOptions: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
  },
  uiHooks: {
    onRequest: function (_, __, next) {
      next();
    },
    preHandler: function (_, __, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, _, __) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
  // TODO implement logo
  // logo: {
  //   type: 'string',
  //   content: 'url-image'
  // }
};

export { swaggerUi, swaggerUiOptions };
