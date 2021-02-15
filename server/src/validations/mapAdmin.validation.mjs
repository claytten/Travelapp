import { celebrate, Joi } from 'celebrate';

export const createMap = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    image: null,
    coordinate: Joi.array().required(),
  }),
});

export const updateMap = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    coordinate: Joi.array().required(),
  }),
});
