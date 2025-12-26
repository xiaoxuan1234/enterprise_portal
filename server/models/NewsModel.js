const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsType = {
  title: String,
  content: String,
  category: Number,
  cover: String,
  isPublish: Number,
  editTime: Date,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
};

const NewsModel = mongoose.model("news", new Schema(NewsType));
module.exports = NewsModel;
