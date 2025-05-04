const mongoose = require("mongoose");
const barSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    rating: { type: Number, default: 0 },
    isFavorite: { type: Boolean, default: false }
});
module.exports = mongoose.model("Bar", barSchema);
