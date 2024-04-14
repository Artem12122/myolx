import React, { useState, useEffect, useRef } from "react";
import {
  Router,
  Route,
  Link,
  NavLink,
  Redirect,
  useParams,
  Switch,
} from "react-router-dom";
import store from "../store";

function Header() {
  const [link, setLink] = useState("")

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      if (state.auth.token !== null) {
        setLink(`/account/${state.auth.payload.sub.login}`)
      } else {
        setLink("/login")
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <header className="App-header">
      <ul>
        <li className="logo">
          <NavLink to="/">LoGo</NavLink>
        </li>
        <li>
          <NavLink to="/about">Повідомлення</NavLink>
        </li>
        <li>
          <NavLink to={link}>Ваш профіль</NavLink>
        </li>
        <li>
          <NavLink to="/add/Ad">Додати оголошення</NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
