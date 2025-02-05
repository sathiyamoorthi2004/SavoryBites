import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import RecipeList from './components/RecipeList';
import 'font-awesome/css/font-awesome.min.css';



const App = () => {
  return (
    <Provider store={store}>
      <div>
      
        
        <RecipeList />
       
     
      </div>
    </Provider>
  );
};

export default App;