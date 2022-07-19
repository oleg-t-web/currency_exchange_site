import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionHistoryContextProvider from 'contexts/TransactionHistoryContext';

import Navbar from 'components/Navbar';

import CurrencyExchanger from './pages/ Exchanger/Exchanger';
import { INITIAL_VALUES } from './pages/helpers/initialValues';
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';
import PAGES from './routes/Links';

function App() {
  return (
    <div>
      <Router>
        <TransactionHistoryContextProvider>
          <Navbar></Navbar>
          <div>
            <Routes>
              <Route exact path={PAGES.HOME} element={<Home />}></Route>
              <Route
                exact
                path={PAGES.EXCHANGER}
                element={<CurrencyExchanger initialValues={INITIAL_VALUES} />}></Route>
              <Route exact path={PAGES.UNKNOWN} element={<NotFound />}></Route>
            </Routes>
          </div>
        </TransactionHistoryContextProvider>
      </Router>
    </div>
  );
}

export default App;
