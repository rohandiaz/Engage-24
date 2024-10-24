# Smart Bite 🍽️

Welcome to **Smart Bite**, a recipe suggester application that provides personalized meal recommendations based on your input ingredients. By leveraging machine learning and integrating the **Edamam API**, Smart Bite offers:

- **Cuisine suggestions** based on available ingredients.
- **Diet recommendations** tailored for weight loss, weight gain, or maintenance.
- A user-friendly **dark mode** for a better browsing experience.

## Features

- **Ingredient-based Cuisine Suggestions**: Input ingredients, and Smart Bite will suggest different cuisines you can make using them.
- **Calorie Tracking & Diet Recommendations**: Tracks calorie counts and recommends meals suited for weight loss, weight gain, or maintaining a healthy balance.
- **Dark Mode Toggle**: Easily switch between light and dark modes for comfortable browsing.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Express, Mongoose, MongoDB
- **API**: Edamam API for fetching recipes and nutritional data
- **Deployment**: Render

## Live Demo

The live version of **Smart Bite** is deployed on Render and can be accessed here: [Smart Bite](https://smart-bite.onrender.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.
- A `.env` file with necessary API keys (e.g., for the Edamam API).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/rohandiaz/Engage-24.git
   
2. Backend Setup:
Navigate to the server folder, install dependencies, and start the server:
   ```bash
   cd Smart_Bite/server
   npm install
   npm run dev

3. Frontend Setup:
Navigate to the client folder, install dependencies, and start the frontend:
    ```bash
   cd Smart_Bite/client
   npm install
   npm run dev

4. Environment Variables:
Ensure that the .env file is set up correctly at the location Smart_Bite and give your PORT and MONGODB_URI.

API Reference
This project uses the Edamam API to fetch recipes and nutritional information. You will need to sign up for the API and add your API keys to the .env file.

For more details on the API, visit Edamam API Documentation.

Deployment
The project is deployed on Render. To deploy your own version:

Push your code to GitHub.
Link the repository to Render and configure the environment variables.
Deploy both the frontend and backend separately.
Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
