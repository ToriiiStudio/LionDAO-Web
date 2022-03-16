import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { useWordingLoader } from './utils/wordingSystem';

import appStore from './store/app';
import language from './store/language';
import walletStatus from './store/walletStatus';

import GlobalStyle from './components/GlobalStyle';
import AutoScrollHelper from './components/AutoScrollHelper';
import ScrollToTopHelper from './components/ScrollToTopHelper';
import LanguageHelper from './components/LanguageHelper';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import styled from 'styled-components';

const reducer = combineReducers({
  app: appStore.reducer,
  language: language.reducer,
  walletStatus: walletStatus.reducer,
});

const store = createStore(reducer);


const App = ({ wording, Router = BrowserRouter }) => {
  const wordingLoaded = useWordingLoader(wording ?? '/wordings/main.json');

  
  return (
    <Provider store={store}>
      <LanguageHelper />
      <Helmet>
        <title>Lion DAO</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700;900&display=swap" rel="stylesheet"></link>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" rel="stylesheet"></link>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" rel="stylesheet"></link>
      </Helmet>
      <GlobalStyle/>
      <Router>
        { !wordingLoaded &&
          <Cover></Cover>
        }
        { wordingLoaded &&
          <>
            <ScrollToTopHelper />
            <AutoScrollHelper />
            <Header />
            <Switch>
              <Route path="/" exact={true} component={HomePage} />
              <Route path="/en" exact={true} component={HomePage} />
              <Route path="/zh-TW" exact={true} component={HomePage} />
            </Switch>
            <Footer />
          </>
        }
      </Router>
    </Provider>
  );
}

const Cover = styled.div`
`

export default App;
