const Review = require("../models/Review");

module.exports = {
    create: (review) => Review.create(review),
    get: (filter) => Review.findOne(filter),
    list: () => Review.find().populate("userId").populate("barId"),
    update: (id, data) => Review.findByIdAndUpdate(id, data, { new: true }),
    delete: (id) => Review.findByIdAndDelete(id),
};
