import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { init as initExchangerApi } from 'api/currencyApi';
import TransactionHistoryContextProvider from 'contexts/TransactionHistoryContext';
import useLoadIndicator from 'hooks/useLoadIndicator';

import WaitIndicator from 'components/muiBased/WaitIndicator/WaitIndicator';
import Navbar from 'components/Navbar';

import Exchanger from './pages/Exchanger/Exchanger';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import PAGES from './routes/Links';

function App() {
  useEffect(() => {
    initExchangerApi();
  }, []); // todo ask why

  const { isLoading } = useLoadIndicator();
  return (
    <div>
      <Router>
        <TransactionHistoryContextProvider>
          <Navbar />
          {/* todo make separate */}
          {isLoading && <WaitIndicator />}
          <div>
            <Routes>
              <Route exact path={PAGES.HOME} element={<Home />} />
              <Route exact path={PAGES.EXCHANGER} element={<Exchanger />} />
              <Route exact path={PAGES.UNKNOWN} element={<NotFound />} />
            </Routes>
          </div>
        </TransactionHistoryContextProvider>
      </Router>
    </div>
  );
}

export default App;
