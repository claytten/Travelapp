import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerDefinition from '../../../docs/swaggerDef.mjs';

const router = express.Router();

const spec = swaggerJsDoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.mjs'],
});

router.use('/', swaggerUI.serve);
router.get(
  '/',
  swaggerUI.setup(spec, {
    explorer: true,
  }),
);

export default router;
