import React from 'react';
import CurrencyExchanger from './pages/currencyExchanger/CurrencyExchanger';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/exchanger" element={<CurrencyExchanger />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
