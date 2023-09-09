const Recipe = require('../models/Recipe');
const express = require("express");
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: Recipe title
 *         ingredients:
 *           type: array
 *           description: Recipe ingredients
 *         instructions:
 *              type: string
 *              description: Recipe instructions
 *         image:
 *              type: string
 *              description: Recipe image
 *       example:
 *         title: Chocolate Chip Cookies
 *         ingredients: ["flour", "sugar", "chocolate chips"]
 *         instructions: "Mix ingredients. Bake at 350 for 15 minutes."
 *         image: "https://www.example.com/recipe-image.jpg"
 */

 /**
  * @swagger
  * tags:
  *   name: Recipes
  *   description: The Recipe managing API
  */

// API Routes

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Returns the list of all the recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: The list of the recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */
// Get all recipes
router.get('/recipes', async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get the recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recipe id
 *     responses:
 *       200:
 *         description: The recipe description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: The recipe was not found
 */
  // Get a single recipe
  router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  /**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: The recipe was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Some server error
 */
  // Create a new recipe
  router.post('/recipes', async (req, res) => {
    const { title, ingredients, instructions, image } = req.body;
    try {
      const recipe = await Recipe.create({
        title,
        ingredients,
        instructions,
        image,
      });
      res.status(201).json({ message: 'Recipe Created', recipe });
    } catch (err) {
      res.status(400).json({ error: 'Invalid data' });
    }
  });
  

  /**
 * @swagger
 * /recipes/{id}:
 *  put:
 *    summary: Update the recipe by the id
 *    tags: [Recipes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The recipe id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Recipe'
 *    responses:
 *      200:
 *        description: The recipe was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recipe'
 *      404:
 *        description: The Recipe was not found
 *      500:
 *        description: Some error happened
 */
  // Update a recipe
  router.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, ingredients, instructions, image } = req.body;
    try {
      const recipe = await Recipe.findByIdAndUpdate(
        id,
        {
          title,
          ingredients,
          instructions,
          image,
        },
        { new: true }
      );
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  /**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Remove the recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recipe id
 * 
 *     responses:
 *       200:
 *         description: The recipe was deleted
 *       404:
 *         description: The recipe was not found
 */
  // Delete a recipe
  router.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await Recipe.findByIdAndDelete(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json({ message: 'Recipe deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;