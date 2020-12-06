const db = require("../models");

// Post Index
const index = (req, res) => {
  db.Post.find({}, (err, foundPosts) => {
    if (err) console.log(err);

    if (!foundPosts.length) {
      return res.json({ message: "No posts in the database" });
    }

    res.json({ posts: foundPosts });
  });
};

// Show Post
const show = (req, res) => {
  db.Post.findById(req.params.id)
    .populate("user")
    .exec((err, foundPost) => {
      if (err) console.log(err);

      res.json({ post: foundPost });
    });
};

// Create Post
const create = (req, res) => {
  db.Post.create(req.body, (err, savedPost) => {
    if (err) console.log(err);

    console.log(req.body);

    res.json({ posts: savedPost });
  });
};

// Update Post
const update = (req, res) => {
  db.Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPost) => {
      if (err) console.log(err);

      res.json({ post: updatedPost });
    }
  );
};

// Delete Post
const destroy = (req, res) => {
  db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
    if (err) console.log(err);

    db.User.deleteMany({ _id: { $in: deletedPost.user } }, (err) => {
      if (err) return console.log(err);
    });

    res.json({ post: deletedPost });
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
