const express = require("express");
const router = express.Router();
const barController = require("../controllers/barController");

router.post("/create", barController.createBar);
router.get("/:id", barController.getBar);
router.put("/:id", barController.updateBar);
router.delete("/:id", barController.deleteBar);
router.get("/", barController.listBars);

module.exports = router;