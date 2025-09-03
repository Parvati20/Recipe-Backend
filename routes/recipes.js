const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { title, calories, ingredients, instructions, image } = req.body; 
  try {
    const recipe = new Recipe({ title, calories, ingredients, instructions, image });
    await recipe.save();
    res.json({ message: "Recipe added successfully", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Recipe updated", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/favorite/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    recipe.isFavorite = !recipe.isFavorite; 
    await recipe.save();
    res.json({ message: "Favorite status updated", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





router.get("/dashboard/total-calories", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    const totalCalories = recipes.reduce((sum, r) => sum + r.calories, 0);
    res.json({ totalCalories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
