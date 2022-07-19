import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionHistoryContextProvider from 'contexts/TransactionHistoryContext';

import Navbar from 'components/Navbar';

import CurrencyExchanger from './pages/ Exchanger/Exchanger';
import { INITIAL_VALUES } from './pages/helpers/initialValues';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import PAGES from './routes/Links';

function App() {
  return (
    <div>
      <Router>
        <TransactionHistoryContextProvider>
          <Navbar />
          <div>
            <Routes>
              <Route exact path={PAGES.HOME} element={<Home />} />
              <Route
                exact
                path={PAGES.EXCHANGER}
                element={<CurrencyExchanger initialValues={INITIAL_VALUES} />}
              />
              <Route exact path={PAGES.UNKNOWN} element={<NotFound />} />
            </Routes>
          </div>
        </TransactionHistoryContextProvider>
      </Router>
    </div>
  );
}

export default App;
