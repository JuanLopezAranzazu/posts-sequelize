const Joi = require("joi");

const id = Joi.number().integer();
const title = Joi.string();
const description = Joi.string();
const userId = Joi.number().integer();
// filter posts
const item = Joi.number().integer();
const entryDates = Joi.array().items(
  Joi.object({ year: item, month: item, date: item })
);
const entryArray = Joi.array().items(item);

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

// filter posts
const filterDateSchema = Joi.object({
  entryDates: entryDates.required(),
});

const filterUserSchema = Joi.object({
  entryArray: entryArray.required(),
});

module.exports = {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
  filterDateSchema,
  filterUserSchema,
};
