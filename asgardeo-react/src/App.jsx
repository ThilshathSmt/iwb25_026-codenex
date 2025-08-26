import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage'; // We will create this page next
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>SafePath - Tourist Safety Platform</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;