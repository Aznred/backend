const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    barId: { type: mongoose.Schema.Types.ObjectId, ref: "Bar", required: true },
    comment: { type: String },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Review", reviewSchema);