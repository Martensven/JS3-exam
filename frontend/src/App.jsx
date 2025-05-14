import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Header } from './Features/Header/header.jsx'
import { Start } from './Features/Start/start.jsx';
import { Recipes } from './Features/Recipes/recipes.jsx';

function App() {

  return (
    <>
      <Header></Header>

      <Routes>
        <Route path='/JS3-exam/' element={<Start />}></Route>
        <Route path='/JS3-exam/recipes' element={<Recipes />}></Route>
      </Routes>
    </>
  )
}

export default App
