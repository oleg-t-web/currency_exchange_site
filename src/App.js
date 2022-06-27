import React from 'react';
import CurrencyExchanger from './pages/currencyExchanger/CurrencyExchanger';
import Home from './pages/home/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PAGES from './pages/Links';
import NotFound from './pages/notFound/NotFound';

function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <div>
          <Routes>
            <Route exact path={PAGES.HOME} element={<Home />}></Route>
            <Route exact path={PAGES.EXCHANGER} element={<CurrencyExchanger />}></Route>
            <Route exact path={PAGES.UNKNOWN} element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
