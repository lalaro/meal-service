const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  calorias: { type: Number, required: true },
  ingredientes: [{ type: String }],
  descripcion: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Food", foodSchema);
