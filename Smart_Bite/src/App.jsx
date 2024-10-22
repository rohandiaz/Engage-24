import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import RecipeInputSection from './components/RecipeInputSection';
import RecipeList from './components/RecipeList';
import Footer from './components/Footer';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchRecipes = async (ingredientsInput) => {
    try {
      const response = await fetch(`http://localhost:5000/getRecipes?ingredients=${ingredientsInput}`);
      const data = await response.json();

      if (data.message) {
        setErrorMessage(data.message);
        setRecipes([]);
      } else {
        setRecipes(data);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setErrorMessage('Failed to fetch recipes.');
    }
  };

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <RecipeInputSection fetchRecipes={fetchRecipes} />
      <RecipeList recipes={recipes} errorMessage={errorMessage} />
      <Footer />
    </div>
  );
}

export default App;
