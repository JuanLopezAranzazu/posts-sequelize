const Joi = require("joi");

const id = Joi.number().integer();
const title = Joi.string();
const description = Joi.string();
// filter posts
const item = Joi.number().integer();
const key = Joi.string();
const entryDates = Joi.array().items(
  Joi.object({ year: item, month: item, date: item })
);
const entryArray = Joi.array().items(item);
const columns = Joi.array().items(key);

const createPostSchema = Joi.object({
  title: title.required(),
  description: description.required(),
});

const updatePostSchema = Joi.object({
  title: title,
  description: description,
});

const getPostSchema = Joi.object({
  id: id.required(),
});

// filter posts
const filterDateSchema = Joi.object({
  entryDates: entryDates.required(),
  columns: columns,
});

const filterUserSchema = Joi.object({
  entryArray: entryArray.required(),
  columns: columns,
});

module.exports = {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
  filterDateSchema,
  filterUserSchema,
};
