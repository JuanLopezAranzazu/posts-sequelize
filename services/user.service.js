const { models } = require("./../sequelize");
const boom = require("@hapi/boom");
const { Op } = require("sequelize");

class UserService {
  constructor() {}

  async findAll() {
    const users = await models.User.findAll({
      attributes: { exclude: ["password"] },
      include: [{ model: models.Post, as: "posts" }],
    });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      include: [{ model: models.Post, as: "posts" }],
    });
    if (!user) throw boom.notFound(`User #${id} not found`);
    return user;
  }

  async findByUsername(username) {
    const user = await models.User.findOne({
      where: { username },
    });
    return user;
  }

  async create(payload) {
    const savedUser = await models.User.create(payload);
    return savedUser;
  }

  async update(id, payload) {
    const user = await this.findOne(id);
    if (!user) throw boom.notFound(`User #${id} not found`);
    const updatedUser = await user.update(payload);
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) throw boom.notFound(`User #${id} not found`);
    await user.destroy();
    return id;
  }
}

module.exports = UserService;
