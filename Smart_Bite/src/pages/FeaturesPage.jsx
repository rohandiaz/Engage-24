// src/pages/FeaturesPage.jsx
import React from 'react';

const FeaturesPage = () => {
  return (
    <div className="py-20 bg-gray-100 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-10">Features of Smart Bite</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="p-8 bg-white shadow-lg rounded-lg">
            <h3 className="text-3xl font-bold text-orange-500 mb-4">Cuisine Suggestions</h3>
            <p>Input your ingredients, and Smart Bite will recommend cuisines based on what you have.</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg">
            <h3 className="text-3xl font-bold text-orange-500 mb-4">Calorie-Conscious Meals</h3>
            <p>Maintain your health goals with calorie-aware meal suggestions.</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg">
            <h3 className="text-3xl font-bold text-orange-500 mb-4">AI-Powered Recipes</h3>
            <p>Get personalized recipe suggestions tailored to your preferences.</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg">
            <h3 className="text-3xl font-bold text-orange-500 mb-4">User-Friendly Interface</h3>
            <p>Our intuitive interface makes it easy to navigate and find recipes!</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg">
            <h3 className="text-3xl font-bold text-orange-500 mb-4">Save Your Favorites</h3>
            <p>Save your favorite recipes for quick access anytime.</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg">
            <h3 className="text-3xl font-bold text-orange-500 mb-4">Recipe Sharing</h3>
            <p>Share your favorite recipes with friends and family easily.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
