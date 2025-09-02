const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },        // Recipe name
  ingredients: { type: [String], required: true },// Array of ingredients
  instructions: { type: String, required: true },// Steps to prepare
  calories: { type: Number, required: true },    // Calories
  createdBy: { type: String },                   // Optional: who created it
  isFavorite: { type: Boolean, default: false }  // Mark as favorite
}, { timestamps: true });                         // Auto add createdAt & updatedAt

module.exports = mongoose.model("Recipe", recipeSchema);
