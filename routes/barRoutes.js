const express = require("express");
const router = express.Router();
const barController = require("../controllers/barController");

router.get("/maps", barController.googleBars);
router.get("/details/:id", barController.googleBarDetails);

module.exports = router;
