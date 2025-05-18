const express = require("express");
const router = express.Router();
const barController = require("../controllers/barController");

// ATTENTION : ordre des routes !
router.get("/maps", barController.googleBars);
router.get("/details/:id", barController.googleBarDetails);

module.exports = router;
