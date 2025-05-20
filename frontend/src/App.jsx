import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Features/Header/header.jsx";
import { Start } from "./Features/Start/start.jsx";
import { RecipeCard } from "./Features/Recipes/recipe-card/recipeCard.jsx";
import { Recipes } from "./Features/Recipes/recipe/recipe.jsx";
import RecipeDetail from "./pages/RecipeDetails";

function App() {
  return (
    <>
      <Header></Header>

      <Routes>
        <Route path="/JS3-exam/" element={<Start />}></Route>
        <Route path="/JS3-exam/recipes" element={<RecipeCard />}></Route>
        <Route path="/JS3-exam/recipes/example" element={<Recipes />}></Route>
        <Route path="/JS3-exam/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </>
  );
}

export default App;
