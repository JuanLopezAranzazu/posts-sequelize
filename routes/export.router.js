const express = require("express");
const exportRouter = express.Router();
const excelJS = require("exceljs");
// services
const PostService = require("../services/post.service");
const postService = new PostService();
// tools
const { getPostsByDates } = require("./../tools/filterPosts");

exportRouter.get("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { entryDates } = body;

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("data");
    const path = "./files";

    worksheet.columns = [
      { header: "Id", key: "id", width: 10 },
      { header: "Title", key: "title", width: 10 },
      { header: "Description", key: "description", width: 10 },
      { header: "Created at", key: "createdAt", width: 10 },
    ];

    const posts = await postService.findAll();
    // filter posts by entry dates
    const filtered = getPostsByDates(posts, entryDates);
    filtered.forEach((item) => {
      worksheet.addRow(item);
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    await workbook.xlsx.writeFile(`${path}/data.xlsx`).then(() => {
      res.send({
        status: "success",
        message: "file successfully downloaded",
        path: `${path}/users.xlsx`,
      });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = exportRouter;
