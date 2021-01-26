import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../../../config/index.mjs';
import { tokenTypes } from '../../../config/token.mjs';
import { AdminModel } from '../../../models/index.mjs';

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

export const saveToken = async (token, adminId, expired, type, blacklisted = false) => {
  const tokenDoc = await AdminModel.tokenModel.create({
    token,
    admin: adminId,
    expired: expired.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verifying token and return new token or throwing an error if its not valid
 * @param {string} token
 * @param {string} type
 * @return {Promise<Token>}
 */
export const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await AdminModel.tokenModel.findOne({ token, type, admin: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
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
  await saveToken(refreshToken, admin.id, refreshTokenExpired, tokenTypes.REFRESH);

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
