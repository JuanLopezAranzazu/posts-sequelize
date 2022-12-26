const { models } = require("../sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class PostService {
  constructor() {}

  async findAll() {
    const posts = await models.Post.findAll({
      include: [{ model: models.User, as: "user" }],
    });
    return posts;
  }

  async findByUser(userId) {
    const posts = await models.Post.findAll({
      where: { userId },
      include: [{ model: models.User, as: "user" }],
    });
    return posts;
  }

  async findOne(id) {
    const post = await models.Post.findOne({
      where: { id },
      include: [{ model: models.User, as: "user" }],
    });
    if (!post) throw boom.notFound(`Post #${id} not found`);
    return post;
  }

  async create(payload) {
    const savedPost = await models.Post.create(payload);
    return savedPost;
  }

  async update(id, payload) {
    const post = await this.findOne(id);
    if (!post) throw boom.notFound(`Post #${id} not found`);
    const updatedPost = await post.update(payload);
    return updatedPost;
  }

  async delete(id) {
    const post = await this.findOne(id);
    if (!post) throw boom.notFound(`Post #${id} not found`);
    await post.destroy();
    return id;
  }
}

module.exports = PostService;
