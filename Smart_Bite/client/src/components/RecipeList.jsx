// src/components/RecipeList.jsx
import React from 'react';

const RecipeList = ({ recipes, errorMessage }) => {
  return (
    <div className="container mx-auto px-4">
      {errorMessage && <p className="text-red-500 mt-8">{errorMessage}</p>}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {recipes.map((recipe, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{recipe.Title}</h3>
            <p><strong>Cuisine:</strong> {recipe.Cuisine}</p>
            <p><strong>Calories:</strong> {recipe.Calories}</p>
            <p><strong>Ingredients:</strong> {recipe.Ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.Instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
