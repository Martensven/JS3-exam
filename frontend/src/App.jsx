import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Header } from './Features/Header/header.jsx'
import { Start } from './Features/Start/start.jsx';
import { RecipeCard } from './Features/Recipes/recipe-card/recipeCard.jsx';
import { Recipes } from './Features/Recipes/recipe/recipe.jsx';
import { Collection } from './Features/Collection/collection.jsx';
import { Categories } from './Features/Categories/categories.jsx';


function App() {

  return (
    <>
      <Header></Header>

      <Routes basename='/JS3-exam'>
        <Route path='/JS3-exam/' element={<Start />}></Route>
        <Route path='/JS3-exam/categories/collection/:categoryTitle' element={<Collection />}></Route>
        <Route path='/JS3-exam/recipes' element={<RecipeCard />}></Route>
        <Route path='/JS3-exam/recipes/example' element={<Recipes />}></Route>
        <Route path='/JS3-exam/categories' element={<Categories />}></Route>
        

      </Routes>
    </>
  )
}

export default App
