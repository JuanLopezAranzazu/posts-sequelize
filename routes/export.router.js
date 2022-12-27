const express = require("express");
const exportRouter = express.Router();
const excelJS = require("exceljs");
// services
const PostService = require("../services/post.service");
const postService = new PostService();
// tools
const { getPostsByDates, getPostsByUser } = require("./../tools/filterPosts");
// middlewares
const validatorHandler = require("./../middleware/validator.handler");
// schemas
const {
  filterDateSchema,
  filterUserSchema,
} = require("./../schemas/post.schema");

function createWorkSheet(callback) {
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("data");

  worksheet.columns = [
    { header: "Id", key: "id", width: 10 },
    { header: "Title", key: "title", width: 10 },
    { header: "Description", key: "description", width: 10 },
    { header: "Created at", key: "createdAt", width: 10 },
  ];

  const filtered = callback;
  filtered.forEach((item) => {
    worksheet.addRow(item);
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  return workbook;
}

/**
 * export data based on date input
 */
exportRouter.get(
  "/",
  validatorHandler(filterDateSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { entryDates } = body;

      const path = "./files";
      const fileName = "filter-date.xlsx";

      const posts = await postService.findAll();
      const workbook = createWorkSheet(getPostsByDates(posts, entryDates));

      await workbook.xlsx.writeFile(`${path}/${fileName}`).then(() => {
        res.send({
          status: "success",
          message: "file successfully downloaded",
          path: `${path}/${fileName}`,
        });
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * export data according to user id input
 */
exportRouter.get(
  "/filter-user",
  validatorHandler(filterUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { entryArray } = body;

      const path = "./files";
      const fileName = "filter-user.xlsx";

      const posts = await postService.findAll();
      const workbook = createWorkSheet(getPostsByUser(posts, entryArray));

      await workbook.xlsx.writeFile(`${path}/${fileName}`).then(() => {
        res.send({
          status: "success",
          message: "file successfully downloaded",
          path: `${path}/${fileName}`,
        });
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = exportRouter;
