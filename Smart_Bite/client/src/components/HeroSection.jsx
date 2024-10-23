

const HeroSection = () => {
  return (
    <header className="relative bg-cover bg-center h-screen text-white flex items-center justify-center dark:bg-gray-900"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&fit=crop&w=1600&q=80')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center backdrop-blur-sm bg-white/10 p-8 rounded-xl dark:bg-black/50">
        <h1 className="text-6xl font-bold mb-6 animate-fade-in">Welcome to Smart Bite</h1>
        <p className="text-xl mb-8 animate-fade-in-delayed">Your AI-powered recipe assistant for smart, delicious meals!</p>
        <a href="#features" className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in-delayed">
          Explore Features
        </a>
      </div>
    </header>
  );
};

export default HeroSection;
