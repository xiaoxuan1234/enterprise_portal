const ProductModel = require("../../models/ProductModel");

const ProductService = {
  add: async ({ title, introduction, detail, cover, editTime }) => {
    return ProductModel.create({
      title,
      introduction,
      detail,
      cover,
      editTime,
    });
  },
  getList: async () => {
    return ProductModel.find({});
  },
  getOne: async ({ _id }) => {
    return ProductModel.findOne({ _id });
  },

  delList: async ({ _id }) => {
    return ProductModel.deleteOne({
      _id,
    });
  },

  // publish: async ({ _id, isPublish, editTime }) => {
  //   return NewsModel.updateOne(
  //     {
  //       _id,
  //     },
  //     {
  //       isPublish,
  //       editTime,
  //     }
  //   );
  // },
  updateList: async ({ title, introduction, detail, _id, cover, editTime }) => {
    if (cover) {
      return ProductModel.updateOne(
        { _id },
        {
          title,
          introduction,
          detail,
          _id,
          cover,
          editTime,
        }
      );
    } else {
      return ProductModel.updateOne(
        { _id },
        {
          title,
          introduction,
          detail,
          _id,
          editTime,
        }
      );
    }
  },
};

module.exports = ProductService;
