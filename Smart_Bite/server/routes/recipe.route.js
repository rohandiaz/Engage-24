import { addRecipe, deleteRecipe, searchRecipe } from "../controllers/recipe.controller.js";
import { Router } from 'express';

const router = Router();

router.post('/find-recipes', searchRecipe);


router.post('/add', addRecipe);

router.delete('/recipes/:id', deleteRecipe);
export default router;