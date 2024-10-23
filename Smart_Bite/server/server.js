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
    origin: 'https://smart-bite.onrender.com',
    credentials: true,
    optionSuccessStatus: 200
}));

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
});

const loadCsvData = () => {
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
                await Recipe.deleteMany(); 
                await Recipe.insertMany(results);
                console.log('CSV data loaded into MongoDB');
            } catch (error) {
                console.error('Error loading CSV data:', error);
            }
        });
};

loadCsvData();

import recipeRoutes from './routes/recipe.route.js';
app.use('/api/v1/recipe', recipeRoutes);