const express = require("express");
const postRouter = express.Router();
// services
const PostService = require("../services/post.service");
const postService = new PostService();
// middlewares
const { verifyToken } = require("../middleware/userExtractor");
const validatorHandler = require("./../middleware/validator.handler");
// tools
const { getPostsByDates } = require("./../tools/filterPosts");
// schemas
const {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
  filterDateSchema,
} = require("./../schemas/post.schema");

postRouter.get("/user", verifyToken, async (req, res, next) => {
  try {
    const { user } = req;
    const posts = await postService.findByUser(user.id);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.get(
  "/date",
  validatorHandler(filterDateSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { entryDates } = body;
      const posts = await postService.findAll();
      const filtered = getPostsByDates(posts, entryDates);
      res.status(200).json(filtered);
    } catch (error) {
      next(error);
    }
  }
);

postRouter.get("/", async (req, res, next) => {
  try {
    const posts = await postService.findAll();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.get(
  "/:id",
  verifyToken,
  validatorHandler(getPostSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const post = await postService.findOne(id);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
);

postRouter.post(
  "/",
  verifyToken,
  validatorHandler(createPostSchema, "body"),
  async (req, res, next) => {
    try {
      const { body, user } = req;
      const dataForPost = {
        ...body,
        userId: user.id,
      };
      const savedPost = await postService.create(dataForPost);
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  }
);

postRouter.put(
  "/:id",
  verifyToken,
  validatorHandler(getPostSchema, "params"),
  validatorHandler(updatePostSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body, user } = req;
      const { id } = params;
      const dataForPost = {
        ...body,
        userId: user.id,
      };
      const updatedPost = await postService.update(id, dataForPost);
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

postRouter.delete(
  "/:id",
  verifyToken,
  validatorHandler(getPostSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      console.log(id);
      const postId = await postService.delete(id);
      res.status(204).json(postId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = postRouter;
