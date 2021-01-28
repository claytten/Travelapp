import { Strategy, ExtractJwt } from 'passport-jwt';
import config from './index.mjs';
import { tokenTypes } from './token.mjs';
import { AdminModel } from '../models/admin/index.mjs';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token Type');
    }
    const admin = await AdminModel.adminModel.findById({ _id: payload.sub });
    if (!admin) {
      return done(null, false);
    }
    done(null, admin);
  } catch (err) {
    done(err, false);
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

export default jwtStrategy;
