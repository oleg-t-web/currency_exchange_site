import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { init as initExchangerApi } from 'api/currencyApi';
import TransactionHistoryContextProvider from 'contexts/TransactionHistoryContext';
import store from 'store/store';

import Navbar from 'components/Navbar';

import CurrencyExchanger from './pages/Exchanger/Exchanger';
// import { INITIAL_VALUES } from './pages/helpers/initialValues';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import PAGES from './routes/Links';

function App() {
  initExchangerApi();

  return (
    <div>
      <Router>
        <Provider store={store}>
          <TransactionHistoryContextProvider>
            <Navbar />
            <div>
              <Routes>
                <Route exact path={PAGES.HOME} element={<Home />} />
                <Route exact path={PAGES.EXCHANGER} element={<CurrencyExchanger />} />
                <Route exact path={PAGES.UNKNOWN} element={<NotFound />} />
              </Routes>
            </div>
          </TransactionHistoryContextProvider>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
