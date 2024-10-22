import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import random

# Load your dataset
data = pd.read_csv(r'J:\projects\receipe\edamam_1000_recipes_with_full_instructions(1).csv', encoding='ISO-8859-1', on_bad_lines='skip')

# Preprocess ingredients: convert to lowercase
data['Ingredients'] = data['Ingredients'].apply(lambda x: x.lower())
# Convert Cuisine to lowercase for uniformity
data['Cuisine'] = data['Cuisine'].str.lower()

# Function to recommend recipes based on user input
def recommend_recipes(user_input, cuisine=None, max_calories=None, previously_recommended=[]):
    # Create TF-IDF vectors
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(data['Ingredients'])
    
    # Transform user input into TF-IDF vector
    user_vector = vectorizer.transform([user_input])
    
    # Calculate cosine similarity
    cosine_similarities = cosine_similarity(user_vector, tfidf_matrix)
    
    # Get top 5 recipes
    similar_indices = cosine_similarities[0].argsort()[-len(data):][::-1]  # Sort all recipes
    recommendations = data.iloc[similar_indices]

    # Filter by cuisine if provided
    if cuisine:
        recommendations = recommendations[recommendations['Cuisine'].str.contains(cuisine)]

    # Filter by max calories if provided
    if max_calories is not None:
        recommendations = recommendations[recommendations['Calories'] <= max_calories]

    # Remove previously recommended recipes
    recommendations = recommendations[~recommendations['Title'].isin(previously_recommended)]

    # Get unique recipes and limit to 5
    unique_recommendations = recommendations.drop_duplicates(subset='Title').head(5)
    
    return unique_recommendations

# Main program loop
previously_recommended = []
while True:
    # User inputs
    user_input = input("Enter the ingredients you have, separated by commas: ").lower()
    cuisine = input("Enter preferred cuisine (optional): ").lower() or None
    max_calories = input("Enter maximum calories (optional, press enter to skip): ")
    max_calories = int(max_calories) if max_calories.isdigit() else None
    
    # Get recommendations
    recommended_recipes = recommend_recipes(user_input, cuisine, max_calories, previously_recommended)

    if recommended_recipes.empty:
        print("No recipes found. Please try different ingredients or filters.")
    else:
        print("\nRecommended Recipes:")
        for index, row in recommended_recipes.iterrows():
            print(f"Title: {row['Title']}")
            print(f"Ingredients: {row['Ingredients']}")
            print(f"Instructions: {row['Instructions']}")
            print(f"Cuisine: {row['Cuisine']}")
            print(f"Calories: {row['Calories']}")
            print("--------------------------------------------------")
        
        # Update previously recommended list
        previously_recommended.extend(recommended_recipes['Title'].tolist())

    # Ask user if they want to refresh
    refresh = input("Would you like to shuffle the recommendations? (yes/no): ").strip().lower()
    if refresh != 'yes':
        break
    else:
        # Shuffle the previously recommended recipes for next time
        previously_recommended = random.sample(previously_recommended, len(previously_recommended))
