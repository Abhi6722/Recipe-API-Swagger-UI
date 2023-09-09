const mongoose = require('mongoose');

// Mongoose model for recipes
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true },
    image: String,
  });
  
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;