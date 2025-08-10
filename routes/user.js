const express = require("express");
const controller = require("../controllers/user");
const router = express.Router();

router.get("/", controller.all);
router.post("/", controller.add);
router.patch("/:id", controller.modify);
router.delete("/:id", controller.drop);

module.exports = router;
