import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import csv from 'csv-parser';
import fs from 'fs';
import { Recipe } from './models/recipe.model.js';

dotenv.config({
    path: '../.env'
});

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));

const PORT = process.env.PORT || 8000;

// Function to load CSV data if database is empty
const loadCsvData = async () => {
    try {
        const recipeCount = await Recipe.countDocuments();         if (recipeCount > 0) {
            console.log('Recipes already exist in the database. Skipping CSV load.');
            return;
        }

        console.log('Loading CSV data into MongoDB...');
        const results = [];
        fs.createReadStream('./data/recipes.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push({
                    title: row.Title,
                    ingredients: row.Ingredients,
                    cuisine: row.Cuisine,
                    calories: parseFloat(row.Calories), 
                    instructions: row.Instructions
                });
            })
            .on('end', async () => {
                try {
                    await Recipe.insertMany(results); 
                    console.log('CSV data successfully loaded into MongoDB.');
                } catch (error) {
                    console.error('Error inserting CSV data:', error);
                }
            });

    } catch (error) {
        console.error('Error checking database:', error);
    }
};


connectDB().then(() => {
    console.log('MongoDB connected successfully.');
    loadCsvData(); 

    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
}).catch((err) => {
    console.log("MongoDB connection failed: ", err);
});

import recipeRoutes from './routes/recipe.route.js';
app.use('/api/v1/recipe', recipeRoutes);
