const express = require("express"),
  app = express();
app.use(express.json());
let userRoute = require("./routes/user");
// app.use("/user", userRoute);

const { connectDB, getConn } = require("./utils/db");
let db;
connectDB((err) => {
  if (!err) {
    console.clear();
    app.listen(3000, () => console.log("server is running at port 3000"));
    db = getConn();
  } else {
    console.log("connection Error" + err);
  }
});
app.get("/user", (req, res) => {
  let users = [];
  db.collection("users")
    .find()
    .forEach((user) => users.push(user))
    .then(() => {
      console.log(users);
      res.json({ con: true, msg: "all users list", result: users });
    })
    .catch((err) => {
      console.log(err);
      res.json({ con: false, msg: "user fetching error" });
    });
});
app.post("/users", (req, res) => {
  let objary = req.body;
  db.collection("users")
    .insertMany(objary)
    .then(() => {
      res.status(201).json({ con: true, msg: "data added" });
    })
    .catch((err) => {
      res.status(500).json({ con: false, msg: err });
    });
});
