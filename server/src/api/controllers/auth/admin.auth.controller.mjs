import httpStatus from 'http-status';
import { loginAdmin, createAdmin, generateAuthAdminToken } from '../../../services/index.mjs';
import logger from '../../../config/logger.mjs';

export const login = async (req, res) => {
  const { email, password } = req.body;
  let token = null;

  logger.debug('Calling login Endpoint with email & password: %o', { email, password });
  const admin = await loginAdmin(email, password);
  if (admin) {
    logger.debug('Generating token : %o', email);
    token = await generateAuthAdminToken(admin);
  }
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'Login Successfully',
    admin,
    token,
  });
};

export const register = async (req, res) => {
  let token = null;

  logger.debug('Calling register Endpoint with req.body : %o', req.body);
  const admin = await createAdmin(req.body);
  if (admin) {
    logger.debug('Generating token register : %o', req.body.email);
    token = await generateAuthAdminToken(admin);
  }
  res.send({
    success: true,
    message: 'Register Successfully',
    admin,
    token,
  });
};
