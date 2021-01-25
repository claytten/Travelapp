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
import config from './config/index.mjs';
import jwtStrategy from './config/passport.mjs';
import { successHandler, errorHandler } from './config/morgan.mjs';
import routes from './api/routes/v1/index.mjs';

const app = express();

if (config.env !== 'testing') {
  app.use(successHandler);
  app.use(errorHandler);
}

//  set security on HTTP headers with using helmet
app.use(helmet());

// parse request to json using body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// v1 api routes
app.use('/v1', routes);

// callback a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({ status: httpStatus.NOT_FOUND, message: 'Not Found' });
  next();
});
app.use(errors());

export default app;
