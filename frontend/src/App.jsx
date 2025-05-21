import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Features/Header/header.jsx";
import { Start } from "./Features/Start/start.jsx";
import { RecipeCard } from "./Features/Recipes/recipe-card/recipeCard.jsx";
import { Recipes } from "./Features/Recipes/recipe/recipe.jsx";
import { Categories } from "./Features/Categories/categories.jsx";

function App() {
  return (
    <>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/recipes" element={<RecipeCard />}></Route>
        <Route path="/recipes/example" element={<Recipes />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route
          path="/categories/category/:category"
          element={<CategoryPage />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
