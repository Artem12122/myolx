import React from "react";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import AdComponentOwner from "./components/AdComponentOwner";
import AdOne from "./components/AdOne";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import MyAd from "./components/MyAd";
import MyAdNew from "./components/MyAdNew";
import Registration from "./components/Registration";
import ScrollAdAll from "./components/ScrollAdAll";
import ScrollAdTags from "./components/ScrollAdTags";
import Tags from "./components/Tags";
import Account from "./components/account";
import store, { persistor } from "./store";
import { history } from "./store/api";
import EditAd from "./components/EditAd";
import SearchInput from "./components/SearchInput";
import Message from "./components/Message";
import ScrollAdSearh from "./components/ScrollAdSearh";

// store.subscribe(() => console.log(store.getState()))

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />

          <main>
            <Route path="/" component={SearchInput} exact/>
            <Route path="/searh" component={SearchInput} />
            <Route path="/searh/:text" component={ScrollAdSearh} />
            
            <Route path="/" component={Tags} exact />
            <Route path="/" component={ScrollAdAll} exact />

            <Route path="/tags" component={Tags} />
            <Route path="/tags/:tag" component={ScrollAdTags} exact />

            <Route path="/Ad/:_id" component={AdOne} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/account/:login" component={Account} exact />
            <Route path="/registration" component={Registration} exact />

            <Route path="/My/Ad" component={MyAd} exact />
            <Route path="/My/Ad/new" component={MyAdNew} exact />
            <Route path="/My/Ad/new/:_id" component={EditAd} exact />

            <Route path="/Ad/owner/:_id" component={AdComponentOwner} />

            <Route path="/message" component={Message} />
          </main>

          <Footer />
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
