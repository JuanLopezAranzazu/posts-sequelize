const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRouter = require("express").Router();
const { config } = require("./../config");
// services
const UserService = require("./../services/user.service");
const userService = new UserService();
// middlewares
const validatorHandler = require("./../middleware/validator.handler");
// schemas
const { loginUserSchema } = require("./../schemas/user.schema");

authRouter.post(
  "/",
  validatorHandler(loginUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { username, password } = body;

      const user = await userService.findByUsername(username);
      const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.password);

      if (!(user && passwordCorrect)) {
        res.status(401).json({
          error: "Invalid user or password",
        });
      }

      const userForToken = {
        id: user.id,
        username: user.username,
      };

      const token = jwt.sign(userForToken, config.secretKey, {
        expiresIn: "10m",
      });

      res.send({
        id: user.id,
        username: user.username,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = authRouter;
