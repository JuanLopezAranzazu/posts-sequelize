const { Model, DataTypes, Sequelize } = require("sequelize");
const POST_TABLE = "post";
const { USER_TABLE } = require("./user.model");

const PostSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Post extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: "Post",
      timestamps: false,
    };
  }
}

module.exports = { POST_TABLE, PostSchema, Post };
