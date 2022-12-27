const Joi = require("joi");

const id = Joi.number().integer();
const username = Joi.string();
const password = Joi.string();
const role = Joi.string().valid("admin", "customer");

const createUserSchema = Joi.object({
  username: username.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  username: username,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

// login
const loginUserSchema = Joi.object({
  username: username.required(),
  password: password.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  loginUserSchema,
};
