const ProductService = require("../../services/admin/ProductService");

const ProductController = {
  add: async (req, res) => {
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const { title, introduction, detail } = req.body;
    await ProductService.add({
      title,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
  getList: async (req, res) => {
    const result = await ProductService.getList();
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  getOne: async (req, res) => {
    const result = await ProductService.getOne({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  // publish: async (req, res) => {
  //   await NewsService.publish({
  //     ...req.body,
  //     editTime: new Date(),
  //   });
  //   res.send({
  //     ActionType: "OK",
  //   });
  // },
  // uploadImage: async (req, res) => {
  //   const url = req.file ? `/newsuploads/${req.file.filename}` : "";
  //   res.send({
  //     errno: 0,
  //     data: {
  //       url: "http://localhost:3000" + url,
  //     },
  //   });
  // },
  delList: async (req, res) => {
    await ProductService.delList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
  updateList: async (req, res) => {
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const { title, introduction, detail, _id } = req.body;
    await ProductService.updateList({
      title,
      introduction,
      detail,
      cover,
      _id,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
};

module.exports = ProductController;
