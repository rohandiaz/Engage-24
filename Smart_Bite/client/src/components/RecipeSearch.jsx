import { useState } from 'react';
import { Search, ChefHat, ThermometerSnowflake } from 'lucide-react';

const RecipeSearch = () => {
  const [cuisine, setCuisine] = useState('');
  const [calories, setCalories] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [maintenanceCalories, setMaintenanceCalories] = useState(0);
  const [fatLossCalories, setFatLossCalories] = useState(0);
  const [muscleGainCalories, setMuscleGainCalories] = useState(0);
  const [gender, setGender] = useState('male');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecipes([]); 
    try {
      const response = await fetch('https://engage-24.onrender.com/api/v1/recipe/find-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ cuisine, calories: parseInt(calories) }),
      });

      if (!response.ok) {
        throw new Error('No recipes found');
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error('No recipes found');
      }

      setRecipes(data);
    } catch (err) {
      setError(err.message);
      setRecipes([]); 
    } finally {
      setLoading(false);
    }
  };

  const calculateCalories = () => {
   
    if (weight && height && age && activityLevel) {
      const bmr = gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5 
        : 10 * weight + 6.25 * height - 5 * age - 161;

      const activityFactor = activityLevel === 'sedentary' ? 1.2 :
        activityLevel === 'lightly active' ? 1.375 :
          activityLevel === 'moderately active' ? 1.55 :
            activityLevel === 'very active' ? 1.725 : 1.9;

      const maintenance = bmr * activityFactor;
      setMaintenanceCalories(maintenance);
      setFatLossCalories(maintenance * 0.85); 
      setMuscleGainCalories(maintenance * 1.15); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Recipe Finder</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Find recipes by cuisine and calorie range</p>
        </div>

        {/* Calorie Calculation Section */}
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Calorie Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight (kg)"
              className="border border-gray-300 rounded-lg py-3 px-4"
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height (cm)"
              className="border border-gray-300 rounded-lg py-3 px-4"
            />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age (years)"
              className="border border-gray-300 rounded-lg py-3 px-4"
            />
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="border border-gray-300 rounded-lg py-3 px-4"
            >
              <option value="">Select Activity Level</option>
              <option value="sedentary">Sedentary</option>
              <option value="lightly active">Lightly Active</option>
              <option value="moderately active">Moderately Active</option>
              <option value="very active">Very Active</option>
              <option value="super active">Super Active</option>
            </select>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)} // Add gender selection
              className="border border-gray-300 rounded-lg py-3 px-4"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            onClick={calculateCalories}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Calculate Maintenance Calories
          </button>
          {maintenanceCalories > 0 && (
            <div className="mt-4 text-gray-600 dark:text-gray-400">
              <p>Maintenance Calories: {Math.round(maintenanceCalories)}</p>
              <p>Fat Loss Calories: {Math.round(fatLossCalories)}</p>
              <p>Muscle Gain Calories: {Math.round(muscleGainCalories)}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative">
              <ChefHat className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" size={24} />
              <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Enter cuisine (e.g., indian, italian)"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            </div>
            <div className="relative">
              <ThermometerSnowflake className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" size={24} />
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Maximum calories"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-transform transform hover:scale-105"
            disabled={loading}
          >
            <Search size={24} />
            {loading ? 'Searching...' : 'Search Recipes'}
          </button>
        </form>

        {error && (
          <div className="text-red-600 text-center mb-8">{error}</div>
        )}

        <div className="grid grid-cols-1 gap-12">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden dark:bg-gray-800"
            >
              <div className="p-8">
                {/* Header Section */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {recipe.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-orange-500 font-medium capitalize">{recipe.cuisine}</span>
                    <span>•</span>
                    <span>{recipe.calories.toFixed(2)} calories</span>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Ingredients Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Ingredients</h3>
                    <ul className="space-y-2">
                      {recipe.ingredients.split(',').map((ingredient, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">
                          {ingredient.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Instructions</h3>
                    <p className="text-gray-700 dark:text-gray-300">{recipe.instructions}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
