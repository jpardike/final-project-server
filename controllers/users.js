const db = require("../models");

// User Index
const index = (req, res) => {
  db.User.find({}, (err, foundUsers) => {
    if (err) console.log(err);

    if (!foundUsers.length) {
      return res.json({ message: "No users in the database" });
    }

    res.json({ users: foundUsers });
  });
};

// Show User
const show = (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) console.log(err);

    res.json({ user: foundUser });
  });
};

// Create User
const create = (req, res) => {
  db.User.create(req.body, (err, savedUser) => {
    if (err) console.log(err);

    console.log(req.body);

    res.json({ users: savedUser });
  });
};

// Update User
const update = (req, res) => {
  db.User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) console.log(err);

      res.json({ user: updatedUser });
    }
  );
};

// Delete User
const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if (err) console.log(err);

    res.json({ user: deletedUser });
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};