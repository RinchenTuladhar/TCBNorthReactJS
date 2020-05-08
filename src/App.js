import React from 'react';
import logo from './logo.svg';
import './App.css';


import Home from './component/Home';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="main">
      <Navbar/>
      <Home/>
    </div>
  );
}

export default App;
