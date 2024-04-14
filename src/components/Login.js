import React, { useState, useEffect, useRef } from "react";
import {
  Router,
  Route,
  Link,
  Redirect,
  useParams,
  Switch,
} from "react-router-dom";


import { useDispatch } from "react-redux";
import store from "../store";
// import { actionFullLogin } from "../store/api";
import authSlice from "../store/authSlice/authSlice";
import { actionFullLogin } from "../store/Thunk/actionFullLogin";


const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChek, setPasswordChek] = useState(false);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const loginFunk = async () => {
    setText("Завантаження")
    
    await dispatch(actionFullLogin(login, password))
    if (store.getState().auth.token !== null) {
        setText("Вход выполнен успешно")
      } else (
        setText("Неверный логин или пароль")
      )
  }


  return (
    <div className="login-form">
      <h2 className="login-title">Вхід</h2>
      <input
        type="text"
        className="login-login"
        onChange={(e) => setLogin(e.target.value)}
        value={login}
        placeholder="Логін"
      ></input>
      <div>
        <input
          type={passwordChek ? "text" : "password"}
          className="login-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Пароль"
        ></input>
        <span
          className={passwordChek ? "icon-eye-blocked" : "icon-eye"}
          onClick={() => setPasswordChek(!passwordChek)}
        ></span>
      </div>
      <button
        className="login-button"
        onClick={() => loginFunk()}
      >
        Увійти
      </button>

      <button onClick={() => dispatch(authSlice.actions.logout())}>
                выйти из аккаунта
            </button>

      <Link className="login-registration-link" to="/registration">
        Реєстрація
      </Link>
      <p className="login-massge">{text}</p>
    </div>
  );
};

export default Login;
