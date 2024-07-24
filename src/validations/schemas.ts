// src/validations/schemas.ts
import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(100).required(),
  email: Joi.string().email().required()
});

export const loginSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(100).required()
});

export const bookingSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  train_id: Joi.number().integer().required(),
  status: Joi.string().valid('confirmed', 'pending', 'cancelled').required()
});
