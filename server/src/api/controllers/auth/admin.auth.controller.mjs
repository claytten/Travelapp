import httpStatus from 'http-status';
import {
  loginAdmin,
  refreshAuth,
  logout as logoutService,
  createAdmin,
  generateAuthAdminToken,
} from '../../../services/index.mjs';
import logger from '../../../config/logger.mjs';
import catchAsync from '../../../utils/catchAsync.mjs';

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  let token = null;

  logger.debug('Calling login Endpoint with email & password: %o', { email, password });
  const admin = await loginAdmin(email, password);
  if (admin) {
    logger.debug('Generating token : %o', email);
    token = await generateAuthAdminToken(admin);
  }
  res.send({
    success: true,
    message: 'Login Successfully',
    admin,
    token,
  });
});

export const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

export const logout = catchAsync(async (req, res) => {
  await logoutService(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});
