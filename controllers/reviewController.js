const Review = require("../models/review.js");

exports.createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ error: "Review not found" });
        res.json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.listReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("userId").populate("barId");
        res.json(reviews);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
