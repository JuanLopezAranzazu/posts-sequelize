const { User, UserSchema } = require("./user.model");
const { Post, PostSchema } = require("./post.model");

function models(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  User.associate(sequelize.models);
  Post.associate(sequelize.models);
}

module.exports = models;
