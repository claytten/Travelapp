import express from 'express';
import bodyParser from 'body-parser';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import passport from 'passport';
import httpStatus from 'http-status';
import config from './config/index.mjs';
import jwtStrategy from './config/passport.mjs';
import { successHandler, errorHandler } from './config/morgan.mjs';
import ApiError from './utils/ApiError.mjs';
import { errorConverter } from './api/middlewares/error.mjs';

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

// callback a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});

// converting if has unkown api request
app.use(errorConverter);

export default app;
