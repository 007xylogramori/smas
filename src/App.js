import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import QrPage from './pages/QrPage';
const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/qr' element={<QrPage/>}/>
    </Routes>
  )
}

export default App

