const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    image: String,
    tags: [String],
    location: String,
    rating: { type: Number, default: 4.5 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
});

module.exports = mongoose.model('Bar', barSchema);
