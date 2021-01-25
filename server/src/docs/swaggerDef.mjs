import config from '../config/index.mjs';

const swaggerDef = {
  openapi: '1.0.0',
  info: {
    title: 'Travelapp',
    version: '0.1.0',
    license: {
      name: 'MIT',
      url: '',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;
