const db = require("./models");
const data = require("./userData.json");

db.User.deleteMany({}, (err, deletedUser) => {
  db.Post.deleteMany({}, (err, deletedPosts) => {
    db.User.create(data.users, (err, seededUser) => {
      if (err) console.log(err);

      console.log(data.users.length, "users created successfully");

      process.exit();
    });
  });
});
