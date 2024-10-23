import { useState } from 'react';
import HeroSection from './components/HeroSection'; 
import FeaturesSection from './components/FeaturesSection'; 
import RecipeSearch from './components/RecipeSearch';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <button 
        onClick={toggleDarkMode} 
        className="fixed top-4 right-4 p-2 bg-gray-300 rounded-md dark:bg-gray-700"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <HeroSection />
      <FeaturesSection />
      <RecipeSearch />
    </div>
  );
};

export default App;
