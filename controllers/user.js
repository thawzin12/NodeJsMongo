const db = require("../utils/db").getConn();
all = (req, res) => {
  res.json({ con: true, msg: "user list", result: users });
};

add = (req, res) => {
  users.push(req.body);
  res.json({ con: true, msg: "new user add", result: users });
};
modify = (req, res, next) => {
  let name = req.params.name;
  let age = req.body.age;
  let foundUser = users.find((u) => (u.name = name));
  if (foundUser) {
    foundUser.age = age;
    res.json({ con: true, msg: "user age updated", result: foundUser });
  } else {
    next(new Error("No user found with that name"));
  }
};

drop = (req, res, next) => {
  let name = req.params.name;
  let found = users.find((u) => u.name === name);
  if (found) {
    users = users.filter((us) => us.name != name);
    res.json({ con: true, msg: "delete user", result: users });
  } else {
    next(new Error("No found user"));
  }
};
module.exports = {
  all,
  add,
  modify,
  drop,
};
