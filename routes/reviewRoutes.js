const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/create", reviewController.createReview);
router.get("/:id", reviewController.getReview);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);
router.get("/", reviewController.listReviews);

module.exports = router;
