import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api.edamam.com/search?q=pizza&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (query = 'pizza') => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50`);
    const data = await response.json();
  
    // Remove duplicate recipes based on the label
    const uniqueRecipes = [];
    const seenLabels = new Set();
  
    data.hits.forEach(hit => {
      const recipe = hit.recipe;
      if (!seenLabels.has(recipe.label)) {
        seenLabels.add(recipe.label);
        uniqueRecipes.push({
          ...recipe,
          totalTime: recipe.totalTime > 0 ? recipe.totalTime : Math.floor(Math.random() * 60) + 10
        });
      }
    });
  
    return uniqueRecipes.slice(0, -4); // Remove the last two recipes
  });
  
const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    favorites: [],
    status: 'idle',
    error: null,
    searchQuery: '',
    filterCategory: '',
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const exists = state.favorites.find(r => r.label === recipe.label);
      if (exists) {
        state.favorites = state.favorites.filter(r => r.label !== recipe.label);
      } else {
        state.favorites.push(recipe);
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite, setSearchQuery, setFilterCategory } = recipeSlice.actions;
export default recipeSlice.reducer;