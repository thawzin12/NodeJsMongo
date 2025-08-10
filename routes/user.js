const express = require("express");
const controller = require("../controllers/user");
const router = express.Router();

router.get("/", controller.all);
router.post("/", controller.add);
router.patch("/:name", controller.modify);
router.delete("/:name", controller.drop);

module.exports = router;
