const { ObjectId } = require("mongodb");

const db = require("../utils/db").getConn();
all = (req, res) => {
  let products = [];
  db.collection("products")
    .find()
    .project({ name: 1, price: 1, _id: 0 })
    .forEach((product) => products.push(product))
    .then(() => {
      res
        .status(201)
        .json({ con: true, msg: "all product list", result: products });
    })
    .catch((err) => {
      res.status(401).json({ con: true, msg: "fetch error", result: err });
    });
};

add = (req, res) => {
  let obj = req.body;
  obj.created = new Date();
  db.collection("products")
    .insertOne(obj)
    .then(() => {
      res.json({ con: true, msg: "new product added" });
    })
    .catch((err) => {
      res.json({ con: false, msg: "insertion error", result: err });
    });
};
modify = (req, res, next) => {
  let id = ObjectId.createFromHexString(req.params.id);
  let price = req.body;
  db.collection("products")
    .updateOne({ _id: id }, { $set: price })
    .then(() => {
      res.status(201).json({ con: true, msg: "updated", result: "ok" });
    })
    .catch((err) => {
      res.status(401).json({ con: false, msg: "updated error", result: err });
    });
};

drop = (req, res, next) => {
  let id = ObjectId.createFromHexString(req.params.id);
  db.collection("products")
    .deleteOne({ _id: id })
    .then(() => {
      res.status(201).json({ con: true, msg: "deleted", result: "ok" });
    })
    .catch((err) => {
      res.status(401).json({ con: false, msg: "deletd error", result: err });
    });
};
module.exports = {
  all,
  add,
  modify,
  drop,
};
