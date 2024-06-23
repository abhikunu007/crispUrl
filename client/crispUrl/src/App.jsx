import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar  from './components/Navbar'
import Home from './components/Home'
import Analytics from './components/Analytics';

const App = () => {
  return (
   <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
   </>
  )
}

export default App