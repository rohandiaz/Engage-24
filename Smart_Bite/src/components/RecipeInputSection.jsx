// src/components/RecipeInputSection.jsx
import React, { useState } from 'react';

const RecipeInputSection = ({ fetchRecipes }) => {
  const [ingredientsInput, setIngredientsInput] = useState('');

  const handleInputChange = (e) => {
    setIngredientsInput(e.target.value);
  };

  const handleSubmit = () => {
    fetchRecipes(ingredientsInput);
  };

  return (
    <section className="py-20 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-10">Try Smart Bite Now</h2>
        <p className="text-xl mb-8">Enter your ingredients and let us suggest your next meal!</p>
        <div className="relative mx-auto max-w-lg">
          <input
            type="text"
            placeholder="e.g., chicken, avocado, lettuce"
            className="px-6 py-4 border border-gray-300 rounded-full w-full text-lg focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-lg"
            value={ingredientsInput}
            onChange={handleInputChange}
          />
          <button
            onClick={handleSubmit}
            className="absolute right-2 top-2 px-8 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            Get Recipes
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecipeInputSection;
