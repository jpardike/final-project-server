const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  body: {
    type: String,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;