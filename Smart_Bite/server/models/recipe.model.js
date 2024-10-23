// models/Recipe.js
import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  ingredients: {
    type: String,
    
  },
  cuisine: { 
    type: String,  
  },
  calories: { 
    type: Number,  
  },
  instructions: { 
    type: String,  
  }
});

export const Recipe = mongoose.model('recipe', RecipeSchema);
