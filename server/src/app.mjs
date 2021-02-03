import express from 'express';
import bodyParser from 'body-parser';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import passport from 'passport';
import httpStatus from 'http-status';
import { errors } from 'celebrate';
import { join, resolve } from 'path';
import config from './config/index.mjs';
import jwtStrategy from './config/passport.mjs';
import { successHandler, errorHandler } from './config/morgan.mjs';
import routes from './api/routes/v1/index.mjs';
import ApiError from './utils/ApiError.mjs';
import { errorHandler as globalError, errorConverter } from './api/middlewares/error.middleware.mjs';
import authRateLimiter from './api/middlewares/rateLimiter.middleware.mjs';

const app = express();

if (config.env !== 'testing') {
  app.use(successHandler);
  app.use(errorHandler);
}

//  set security on HTTP headers with using helmet
app.use(helmet());

// parse request to json using body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable viewing image on folder uploads
app.use('/uploads', express.static(join(resolve(), '/uploads')));

// sanitaze request data
app.use(xss());
app.use(mongoSanitize());

// compression request data to reduce packet
app.use(compression());

// enabling cors
app.use(cors());
app.options('*', cors()); // you can check on repository cors to more options cors

// enabling jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit failed request to auth admin endpoints
if (config.env === 'production') {
  app.use('/v1/auth/admin', authRateLimiter);
}

// v1 api routes
app.use('/v1', routes);

// callback a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});
// convert error to ApiError, if needed
app.use(errorConverter);

// handling errorConverter to JSON
app.use(globalError);

// Error handling checking req.body with celebrate Joi
app.use(errors());

export default app;
