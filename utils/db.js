const { MongoClient } = require("mongodb");
connStr = "mongodb://localhost:27017/media";
let conn;
const connectDB = (cb) => {
  MongoClient.connect(connStr)
    .then((client) => {
      conn = client.db();
      cb();
    })
    .catch(() => cb(err));
};
const getConn = () => conn;
module.exports = {
  connectDB,
  getConn,
};
