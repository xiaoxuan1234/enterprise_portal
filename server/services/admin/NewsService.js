const NewsModel = require("../../models/NewsModel");

const NewsService = {
  add: async ({
    title,
    content,
    category,
    cover,
    isPublish,
    editTime,
    author,
  }) => {
    return NewsModel.create({
      title,
      content,
      category,
      cover,
      isPublish,
      editTime,
      author,
    });
  },
  getList: async ({ author }) => {
    return NewsModel.find({ author });
  },
  getOne: async ({ _id }) => {
    return NewsModel.findOne({ _id });
  },

  delList: async ({ _id }) => {
    return NewsModel.deleteOne({
      _id,
    });
  },

  publish: async ({ _id, isPublish, editTime }) => {
    return NewsModel.updateOne(
      {
        _id,
      },
      {
        isPublish,
        editTime,
      }
    );
  },
  updateList: async ({
    _id,
    title,
    content,
    category,
    isPublish,
    cover,
    editTime,
  }) => {
    if (cover) {
      return NewsModel.updateOne(
        { _id },
        {
          title,
          category,
          isPublish,
          cover,
          editTime,
          content,
        }
      );
    } else {
      return NewsModel.updateOne(
        { _id },
        {
          title,
          category,
          isPublish,
          editTime,
          content,
        }
      );
    }
  },
};

module.exports = NewsService;
