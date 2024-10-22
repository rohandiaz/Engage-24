import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import random
import streamlit as st

# Load your dataset
data = pd.read_csv('edamam_1000_recipes_with_full_instructions(1).csv', encoding='ISO-8859-1', on_bad_lines='skip')

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
    
    # Get top recipes based on similarity scores
    similar_indices = cosine_similarities[0].argsort()[-len(data):][::-1]
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

# Initialize Streamlit app
st.title('Recipe Recommendation App')

# Get user input for ingredients
ingredients_input = st.text_input('Enter the ingredients you have, separated by commas:', '')

# Optional cuisine selection
cuisine_input = st.text_input('Enter preferred cuisine (optional):', '')

# Optional calorie limit
max_calories_input = st.text_input('Enter maximum calories (optional, press enter to skip):')
max_calories = int(max_calories_input) if max_calories_input.isdigit() else None

# Initialize a session state to store previously recommended recipes
if 'previously_recommended' not in st.session_state:
    st.session_state.previously_recommended = []

# When the user clicks the "Recommend" button
if st.button('Recommend Recipes'):
    if ingredients_input:
        # Get recommended recipes
        recommended_recipes = recommend_recipes(
            ingredients_input.lower(), 
            cuisine_input.lower() if cuisine_input else None, 
            max_calories, 
            st.session_state.previously_recommended
        )

        if recommended_recipes.empty:
            st.write("No recipes found. Please try different ingredients or filters.")
        else:
            # Display the recommendations
            for index, row in recommended_recipes.iterrows():
                st.subheader(row['Title'])
                st.write(f"**Ingredients**: {row['Ingredients']}")
                st.write(f"**Instructions**: {row['Instructions']}")
                st.write(f"**Cuisine**: {row['Cuisine']}")
                st.write(f"**Calories**: {row['Calories']}")
                st.write("---")
            
            # Update previously recommended list in session state
            st.session_state.previously_recommended.extend(recommended_recipes['Title'].tolist())
    else:
        st.write("Please enter some ingredients.")

# Button to shuffle recommendations
if st.button('Shuffle Recipes'):
    # Shuffle the previously recommended recipes
    if st.session_state.previously_recommended:
        st.session_state.previously_recommended = random.sample(st.session_state.previously_recommended, len(st.session_state.previously_recommended))
        st.write("Recommendations shuffled! Click 'Recommend Recipes' again to get new ones.")
    else:
        st.write("No recommendations to shuffle yet.")
