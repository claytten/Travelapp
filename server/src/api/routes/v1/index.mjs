import express from 'express';
import config from '../../../config/index.mjs';
import { adminAuthRoute } from './auth/index.mjs';
import { accountRoute, mapsRoute } from './admin/index.mjs';
import publicRoute from './guest/index.mjs';
import docsRoute from './docs.route.mjs';

const app = express();
const defaultRoutes = [
  {
    path: '/auth/admin',
    routePath: adminAuthRoute,
  },
  {
    path: '/admin/account',
    routePath: accountRoute,
  },
  {
    path: '/admin/maps',
    routePath: mapsRoute,
  },
  {
    path: '/',
    routePath: publicRoute,
  },
];

const devRoutes = [
  {
    path: '/docs',
    routePath: docsRoute,
  },
];

defaultRoutes.map((route) => app.use(route.path, route.routePath));

if (config.env === 'development') {
  devRoutes.map((route) => app.use(route.path, route.routePath));
}

export default app;
