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
  const filterAdmin = admin.toObject();
  Reflect.deleteProperty(filterAdmin, 'password');
  Reflect.deleteProperty(token, 'refresh');
  res
    .json({
      success: !!admin,
      message: admin ? 'Login Successfully' : 'Incorrect email or password',
      data: { admin: filterAdmin, token },
    })
    .status(admin ? '200' : '403')
    .end();
};

export const register = async (req, res) => {
  let token = null;

  logger.debug('Calling register Endpoint with req.body : %o', req.body);
  const admin = await createAdmin(req.body);
  if (admin) {
    logger.debug('Generating token register : %o', req.body.email);
    token = await generateAuthAdminToken(admin);
  }
  const filterAdmin = admin.toObject();
  Reflect.deleteProperty(admin, 'password');
  Reflect.deleteProperty(token, 'refresh');
  res
    .json({
      success: !!admin,
      message: admin ? 'Register Successfully' : 'Incorrect email or password',
      data: { admin: filterAdmin, token },
    })
    .status(admin ? '200' : '403')
    .end();
};
