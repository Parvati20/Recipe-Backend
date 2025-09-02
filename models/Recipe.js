const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  calories: { type: Number, required: true },
  createdBy: { type: String },
  isFavorite: { type: Boolean, default: false },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);

