import {Recipe} from '../models/recipe.model.js';


export const searchRecipe = async (req, res) => {
    try {
        const { cuisine, calories } = req.body; // Change this line
        const calorieLimit = parseFloat(calories);

        // Define the range for calorie filtering
        const lowerLimit = calorieLimit - 200; // Lower limit for calories
        const upperLimit = calorieLimit; // Upper limit based on user input

        // Query to search for recipes by cuisine and calories within the specified range
        const recipes = await Recipe.find({
            cuisine: cuisine,
            calories: { $gte: lowerLimit, $lte: upperLimit } // Get recipes within the range
        }).sort({ calories: 1 }); // Sort by calories in ascending order

        // Send response only once
        if (recipes.length > 0) {
            return res.json(recipes); // Use return to stop execution here
        } else {
            return res.status(404).json({ message: 'No recipes found.' });
        }

    } catch (error) {
        console.error('Error in searchRecipe:', error);
        return res.status(500).json({ message: 'Server error' }); // Always handle errors with a response
    }
};

export const addRecipe = async (req, res) => {
    try {
        const { title, ingredients, cuisine, calories, instructions } = req.body;

        const newRecipe = new Recipe({
            title,
            ingredients,
            cuisine,
            calories,
            instructions
        });

        const savedRecipe = await newRecipe.save();

        return res.status(201).json(savedRecipe);
    } catch (error) {
        console.error('Error in addRecipe:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params; // Get the recipe ID from the request parameters

        // Attempt to delete the recipe
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        // Check if the recipe was found and deleted
        if (deletedRecipe) {
            return res.status(200).json({ message: 'Recipe deleted successfully.' });
        } else {
            return res.status(404).json({ message: 'Recipe not found.' });
        }
    } catch (error) {
        console.error('Error in deleteRecipe:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};