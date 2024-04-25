import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import store from "../store";
import { actionFullRegister } from "../store/Thunk/actionFullRegister";

const Registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordChek, setPasswordChek] = useState(false);
  const [passwordChekConfirm, setPasswordChekConfirm] = useState(false);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    password === passwordConfirm
      ? setText("")
      : setText("Паролі не співпадають");
  }, [password, passwordConfirm]);

  const regFunk = async (e) => {
    e.preventDefault();
    setText("Завантаження");

    await dispatch(actionFullRegister(login, password));
    if (store.getState().auth.token !== null) {
      setText("Ви успішно зареєстровані");
    } else {
      setText("Емеїл вже зайнятий");
    }
  };

  return (
    <form className="reg-form">
      <h2 className="reg-title">Реєстрація</h2>
      <input
        type="text"
        className="reg-login"
        onChange={(e) => setLogin(e.target.value)}
        value={login}
        placeholder="Логін"
      ></input>
      <div className="block-reg-password">
        <input
          type={passwordChek ? "text" : "password"}
          className={`reg-password ${
            password === passwordConfirm ? "" : "error-password"
          }`}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Пароль"
        />
        <span
          className={passwordChek ? "icon-eye-blocked" : "icon-eye"}
          onClick={() => setPasswordChek(!passwordChek)}
        ></span>
      </div>
      <div className="block-reg-password-confirm">
        <input
          type={passwordChekConfirm ? "text" : "password"}
          className={`reg-password-confirm ${
            password === passwordConfirm ? "" : "error-password"
          }`}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          placeholder="Підтвердіть пароль"
        />
        <span
          className={passwordChekConfirm ? "icon-eye-blocked" : "icon-eye"}
          onClick={() => setPasswordChekConfirm(!passwordChekConfirm)}
        ></span>
      </div>
      <button
        className="reg-button"
        onClick={(e) => regFunk(e)}
        disabled={password === "" || password !== passwordConfirm}
      >
        Зареєструватися
      </button>

      <p className="reg-massge">{text}</p>
    </form>
  );
};

export default Registration;
