const Joi = require("joi");

const id = Joi.number().integer();
const title = Joi.string();
const description = Joi.string();
const userId = Joi.number().integer();
const entryDates = Joi.array().items(Joi.number);

const createPostSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  userId: userId.required(),
});

const updatePostSchema = Joi.object({
  title: title,
  description: description,
  userId: userId,
});

const getPostSchema = Joi.object({
  id: id.required(),
});

// entry dates
const filterDateSchema = Joi.object({
  entryDates: entryDates.required(),
});

module.exports = {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
  filterDateSchema,
};
