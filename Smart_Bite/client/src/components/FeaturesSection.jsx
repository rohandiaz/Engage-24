
const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-100 text-center dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-16">What Makes Smart Bite Special?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl dark:bg-gray-700">
            <h3 className="text-3xl font-bold text-orange-500 mb-4">Cuisine Suggestions</h3>
            <p>Input your ingredients, and Smart Bite will recommend cuisines from all around the globe based on what you have.</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl dark:bg-gray-700">
            <h3 className="text-3xl font-bold text-orange-500 mb-4">Calorie-Conscious Meals</h3>
            <p>Maintain your health goals with calorie-aware meal suggestions, perfect for weight loss, gain, or balanced nutrition.</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl dark:bg-gray-700">
            <h3 className="text-3xl font-bold text-orange-500 mb-4">AI-Powered Recipes</h3>
            <p>Get personalized recipe suggestions and detailed nutrition information, tailored to your preferences and ingredients.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
