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

    db.User.findById(req.body.user, (err, foundUser) => {
      foundUser.posts.push(savedPost._id);
      foundUser.save((err, savedUser) => {
        if (err) {
          console.log(err);
        }
      });
    });

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
  const postId = req.params.id;
  db.Post.findByIdAndDelete(postId, (err, deletedPost) => {
    if (err) console.log(err);

    db.User.findOne({ posts: postId }, (err, foundUser) => {
      if (err) return console.log(err);
      foundUser.posts.remove(postId);
      foundUser.save((err, updatedUser) => {
        if (err) return console.log(err);
      });
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
