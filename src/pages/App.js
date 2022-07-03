import React from 'react';
import CurrencyExchanger from './currencyExchanger/CurrencyExchanger';
import Home from './home/Home';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PAGES from './helpers/Links';
import NotFound from './notFound/NotFound';
import { INITIAL_VALUES } from './helpers/initialValues';

function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <div>
          <Routes>
            <Route exact path={PAGES.HOME} element={<Home />}></Route>
            <Route
              exact
              path={PAGES.EXCHANGER}
              element={<CurrencyExchanger {...INITIAL_VALUES} />}></Route>
            <Route exact path={PAGES.UNKNOWN} element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
