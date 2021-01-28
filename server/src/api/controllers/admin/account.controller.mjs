import { updateProfile as saveProfile, resetPass } from '../../../services/index.mjs';
import catchAsync from '../../../utils/catchAsync.mjs';

export const profileLogin = (req, res) => {
  res.send({
    id: req.user._id,
    role: req.user.role,
    name: req.user.name,
    email: req.user.email,
  });
};

export const updateProfile = catchAsync(async (req, res) => {
  const update = await saveProfile(req.params.adminId, req.body);
  res.send({
    success: true,
    message: 'Update Successfully',
    update,
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  const reset = await resetPass(req.params.adminId, req.body);
  res.send({
    success: true,
    message: 'Update Password Successfully',
    reset,
  });
});
