import requests
import pandas as pd
import time
from dotenv import load_dotenv
import os

# Your Edamam API credentials
APP_ID = os.getenv('EDAMAM_APP_ID')
APP_KEY = os.getenv('EDAMAM_APP_KEY')

# Function to fetch recipes based on user-provided ingredients
def fetch_recipes(ingredients, to=100):
    url = 'https://api.edamam.com/search'
    params = {
        'q': ','.join(ingredients),  # Join ingredients with a comma
        'app_id': APP_ID,
        'app_key': APP_KEY,
        'to': to  # Number of recipes to fetch in this request
    }
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        return response.json()  # Return the JSON response
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

# Function to generate the dataset with 1,000 recipes
def generate_large_recipe_dataset(target_count=1000):
    all_recipes = []
    ingredient_queries = [
        ['chicken', 'rice', 'broccoli'],
        ['beef', 'carrot', 'potato'],
        ['fish', 'tomato', 'onion'],
        ['pasta', 'cheese', 'mushroom'],
        ['egg', 'spinach', 'bell pepper'],
        # You can add more ingredient combinations here to vary the query
    ]
    
    total_recipes = 0
    
    while total_recipes < target_count:
        for ingredients in ingredient_queries:
            if total_recipes >= target_count:
                break
            
            # Fetch recipes based on current ingredient query
            recipes_data = fetch_recipes(ingredients)
            
            if recipes_data and 'hits' in recipes_data:
                for hit in recipes_data['hits']:
                    if total_recipes >= target_count:
                        break
                    
                    recipe = hit['recipe']
                    
                    # Fetch relevant data from the recipe
                    calories = recipe.get('calories', 'No calorie info')
                    ingredient_lines = recipe.get('ingredientLines', [])
                    meal_type = ', '.join(recipe.get('mealType', [])) or 'Meal'
                    dish_type = ', '.join(recipe.get('dishType', [])) or 'Dish'
                    health_labels = ', '.join(recipe.get('healthLabels', [])) or 'No specific health labels'
                    
                    # Create detailed cooking instructions step-by-step
                    detailed_instructions = (
                        f"Start by gathering the following ingredients: {', '.join(ingredient_lines)}. "
                        f"Prepare the dish categorized as a {dish_type}. Follow these steps:\n"
                        f"1. Begin by preparing your workspace. Clean your vegetables and proteins. "
                        f"2. Heat up your pan (or oven, depending on the dish) to a medium temperature. "
                        f"3. For proteins like chicken or meat, cook them thoroughly until browned on all sides and fully cooked inside.\n"
                        f"4. If your recipe includes vegetables, sauté them until tender but still crisp. "
                        f"5. Add seasonings and any sauces to taste. "
                        f"6. Once everything is cooked and well-combined, give it a final stir. "
                        f"7. Serve the {dish_type} hot. This dish is suitable for {health_labels}. It contains approximately "
                        f"{round(calories, 2)} calories in total."
                    )
                    
                    # Append the recipe details to the list
                    all_recipes.append({
                        'Title': recipe['label'],
                        'Ingredients': ', '.join(ingredient_lines),
                        'Cuisine': ', '.join(recipe.get('cuisineType', [])) or 'Unknown Cuisine',
                        'Calories': round(calories, 2) if isinstance(calories, (int, float)) else 'No calorie info',
                        'Instructions': detailed_instructions
                    })
                    
                    total_recipes += 1
        
        # Pause between batches to avoid rate-limiting issues
        time.sleep(2)
    
    # Create a DataFrame
    recipes_df = pd.DataFrame(all_recipes)
    
    # Save to CSV
    recipes_df.to_csv('edamam_1000_recipes_with_full_instructions.csv', index=False)
    print(f"Saved {len(all_recipes)} recipes to edamam_1000_recipes_with_full_instructions.csv")

# Generate the dataset
generate_large_recipe_dataset(target_count=1000)
