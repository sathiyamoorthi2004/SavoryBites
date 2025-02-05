// src/components/RecipeList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes, toggleFavorite } from '../slices/recipeSlice';
import SearchBar from './SearchBar';
import Footer from './Footer';
import Navbar from './Navbar';
import './RecipeList.css';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { items, status, favorites } = useSelector((state) => state.recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

  const filteredRecipes = items.filter(recipe => {
    const matchesSearch = recipe.label && recipe.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      category === 'all' ||
      (category === 'vegetarian' && recipe.healthLabels?.some(label => label.toLowerCase().includes('vegetarian'))) ||
      (category === 'vegan' && (recipe.healthLabels?.some(label => label.toLowerCase().includes('vegan')) || recipe.dietLabels?.some(label => label.toLowerCase().includes('vegan')))) ||
      (category === 'dessert' && (recipe.dishType?.some(type => type.toLowerCase().includes('dessert')) || recipe.label.toLowerCase().includes('dessert')));
    return matchesSearch && matchesCategory;
  }).slice(0, -2); // Remove last two recipes

  return (
    <div className="recipe-container" style={{ animation: 'fadeIn 1s ease-in-out', background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
      <Navbar />
      <h1 className="app-title" style={{ textAlign: 'left', fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', color: '#d35400', animation: 'bounceIn 1s ease-in-out' }}>SavoryBites</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} category={category} setCategory={setCategory} />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error fetching recipes.</p>}
      <div className="recipe-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0 20px' }}>
        {filteredRecipes.map((recipe, index) => (
          <div key={recipe.label} className="recipe-card animated-card" onClick={() => setSelectedRecipe(recipe)}
               style={{ width: 'calc(25% - 40px)', margin: '10px 20px', textAlign: 'center', background: 'white', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out' }}>
            <h3>{recipe.label}</h3>
            <img src={recipe.image} alt={recipe.label} className="recipe-image" />
            <p className="recipe-description">{recipe.healthLabels.slice(0, 3).join(', ')}</p>
            <div className="button-container" style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleFavorite(recipe));
              }}>
                {favorites.some(fav => fav.label === recipe.label) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2 id="favorites" className="favorite-recipes-heading" style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', marginTop: '40px', padding: '10px', backgroundColor: '#d35400', color: '#fff', borderRadius: '10px', animation: 'fadeIn 1s ease-in-out' }}>Favorite Recipes</h2>
      <div className="favorite-recipes" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
        {favorites.map((fav) => (
          <div key={fav.label} className="recipe-card animated-card" style={{ margin: '20px', background: 'white', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out' }}>
            <h3>{fav.label}</h3>
            <img src={fav.image} alt={fav.label} className="recipe-image" />
            <p className="recipe-description">{fav.healthLabels.slice(0, 3).join(', ')}</p>
            <div className="button-container">
              <button onClick={() => dispatch(toggleFavorite(fav))}>Remove from Favorites</button>
            </div>
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className="recipe-details">
          <h3>{selectedRecipe.label}</h3>
          <p>Ingredients: {selectedRecipe.ingredientLines.join(', ')}</p>
          <p>Prep Time: {selectedRecipe.totalTime} mins</p>
          <p>Servings: {selectedRecipe.yield}</p>
          <button onClick={() => setSelectedRecipe(null)}>Close</button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RecipeList;
