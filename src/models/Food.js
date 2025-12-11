const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  tipo: { 
    type: String, 
    required: true,
    enum: ["desayuno", "almuerzo", "cena", "otro"] 
  },
  calorias: { 
    type: Number, 
    required: true 
  },
  descripcion: { 
    type: String 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("Food", foodSchema);
