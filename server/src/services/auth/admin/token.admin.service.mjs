import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../../../config/index.mjs';
import { tokenTypes } from '../../../config/token.mjs';

/**
 * Generate Token
 * @param {ObjectId} adminId
 * @param {Moment} expired
 * @param {string} {secret}
 * @return {string}
 */
export const generateToken = (adminId, expired, type, secret = config.jwt.secret) => {
  const payload = {
    sub: adminId,
    iat: moment().unix(),
    exp: expired.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generate auth token
 * @param {Admin} admin
 * @return {Promise<Object>}
 */
export const generateAuthAdminToken = async (admin) => {
  const accessTokenExpired = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(admin.id, accessTokenExpired, tokenTypes.ACCESS);

  const refreshTokenExpired = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(admin.id, refreshTokenExpired, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expired: accessTokenExpired.toDate(),
    },
    refresh: {
      token: refreshToken,
      expired: refreshTokenExpired.toDate(),
    },
  };
};
