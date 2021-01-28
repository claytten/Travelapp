import { celebrate, Joi } from 'celebrate';

export const updateProfile = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    confirmationPassword: Joi.string()
      .required()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    // /^
    //   (?=.*\d)          // should contain at least one digit
    //   (?=.*[a-z])       // should contain at least one lower case
    //   (?=.*[A-Z])       // should contain at least one upper case
    //   [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
    // $/
  }),
});

export const resetPassword = celebrate({
  body: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string()
      .required()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
  }),
});
