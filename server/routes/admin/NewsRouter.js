var express = require("express");
const NewsController = require("../../controllers/admin/NewsControlles");
var NewsRouter = express.Router();

const multer = require("multer");
const upload = multer({ dest: "public/newsuploads/" });

NewsRouter.post(
  "/adminapi/news/add",
  upload.single("file"),
  NewsController.add
);
NewsRouter.get("/adminapi/news/list", NewsController.getList);
NewsRouter.get("/adminapi/news/list/:id", NewsController.getOne);
NewsRouter.post(
  "/adminapi/news/list",
  upload.single("file"),
  NewsController.updateList
);
NewsRouter.delete("/adminapi/news/list/:id", NewsController.delList);
NewsRouter.put("/adminapi/news/publish", NewsController.publish);
NewsRouter.post(
  "/adminapi/news/uploadImage",
  upload.single("file"),
  NewsController.uploadImage
);
module.exports = NewsRouter;
