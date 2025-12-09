const Food = require("../models/Food");

exports.create = (data) => Food.create(data);

exports.listByUser = (userId) => Food.find({ userId });

exports.findById = (id) => Food.findById(id);

exports.update = (id, data) =>
  Food.findByIdAndUpdate(id, data, { new: true });

exports.delete = (id) => Food.findByIdAndDelete(id);
