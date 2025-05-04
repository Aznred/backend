const User = require("../models/User");

module.exports = {
    create: (user) => User.create(user),
    get: (filter) => User.findOne(filter),
    list: () => User.find(),
    update: (id, data) => User.findByIdAndUpdate(id, data, { new: true }),
    delete: (id) => User.findByIdAndDelete(id),
};


// dao/barDao.js
const Bar = require("../models/Bar");

module.exports = {
    create: (bar) => Bar.create(bar),
    get: (filter) => Bar.findOne(filter),
    list: () => Bar.find(),
    update: (id, data) => Bar.findByIdAndUpdate(id, data, { new: true }),
    delete: (id) => Bar.findByIdAndDelete(id),
};