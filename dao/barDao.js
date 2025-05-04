const Bar = require("../models/Bar");

module.exports = {
    create: (bar) => Bar.create(bar),
    get: (filter) => Bar.findOne(filter),
    list: () => Bar.find(),
    update: (id, data) => Bar.findByIdAndUpdate(id, data, { new: true }),
    delete: (id) => Bar.findByIdAndDelete(id),
};
