import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  Router,
  Route,
  Link,
  Redirect,
  useParams,
  Switch,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tags from "./components/Tags";
import AdOne from "./components/AdOne";
import Login from "./components/Login";
import Registration from "./components/Registration";
import store, {persistor} from "./store"
import {Provider, useSelector} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { history } from "./store/api";
import Account from "./components/account";
import ScrollAdAll from "./components/ScrollAdAll";
import ScrollAdTags from "./components/ScrollAdTags";



// store.subscribe(() => console.log(store.getState()))

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />

          <main>
            <Route path="/" component={Tags} exact/>
            <Route path="/" component={ScrollAdAll} exact />

            <Route path="/tags" component={Tags} />
            <Route path="/tags/:tag" component={ScrollAdTags} exact />

            <Route path="/Ad/:_id" component={AdOne} />
            <Route path="/login" component={Login} exact />
            <Route path="/account/:login" component={Account} exact />
            <Route path="/registration" component={Registration} exact />
          </main>

          <Footer />
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
