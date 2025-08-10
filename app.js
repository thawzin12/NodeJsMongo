const express = require("express"),
  app = express();
app.use(express.json());

const { connectDB } = require("./utils/db");

const init = () => {
  console.clear();
  app.listen(3000, () => console.log("server is running at port 3000"));
  let userRoute = require("./routes/user");
  app.use("/user", userRoute);
};
connectDB((err) => {
  if (!err) {
    init();
  } else {
    console.log("connection Error" + err);
  }
});
