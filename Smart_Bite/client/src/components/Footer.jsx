
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="hover:text-orange-500 transition-colors">
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="#" className="hover:text-orange-500 transition-colors">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="#" className="hover:text-orange-500 transition-colors">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a href="#" className="hover:text-orange-500 transition-colors">
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
        </div>
        <p>Smart Bite &copy; 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
