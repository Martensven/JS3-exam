import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Header } from './Features/Header/header.jsx';
import { Footer } from './Features/Footer/footer.jsx';
import { Start } from './Features/Start/start.jsx';
import { Recipes } from './Features/Recipes/recipe/recipe.jsx';
import { RecipesEdit } from './Features/Recipes/recipe-edit/recipeEdit.jsx';
import { Collection } from './Features/Collection/collection.jsx';
import { Categories } from './Features/Categories/categories.jsx';
import ReviewList from './Features/Reviews/ReviewList/ReviewList.jsx';
import TopRatedRecipes from './Features/Recipes/TopRated/topRatedRecipes.jsx';
import { CreateRecipeSide } from './Features/Recipes/CreateRecipe/createRecipeSide.jsx';


function App() {
  return (
    <>
      <Header></Header>

      <Routes basename='/JS3-exam'>
        <Route path='/JS3-exam/' element={<Start />}></Route>
        <Route path='/JS3-exam/categories/collection/:categoryTitle' element={<Collection />}></Route>
        <Route path='/JS3-exam/recipes/:id' element={<Recipes />}></Route>
        <Route path='/JS3-exam/recipes/edit/:id' element={<RecipesEdit />}></Route>
        <Route path='/JS3-exam/categories' element={<Categories />}></Route>
        <Route path='/JS3-exam/recipes/create' element={<CreateRecipeSide />}></Route>
        <Route path='/JS3-exam/recipes/:id' element={<ReviewList />}></Route>
        <Route path='/JS3-exam/top-rated' element={<TopRatedRecipes />}></Route>
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
