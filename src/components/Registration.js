import React, { useState, useEffect, useRef } from "react";
import {
    Router,
    Route,
    Link,
    Redirect,
    useParams,
    Switch,
  } from "react-router-dom";
import { useRegistrationMutation } from "../store/api";


const Registration = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [passwordChek, setPasswordChek] = useState(false)
    const [passwordChekConfirm, setPasswordChekConfirm] = useState(false)

    const [loginQuery, {isLoading, data}] = useRegistrationMutation()

    console.log(data)


    return (
        <div className="reg-form">
            <h2 className="reg-title">Реєстрація</h2>
            <input type="text" className="reg-login" onChange={(e) => setLogin(e.target.value)} value={login} placeholder="Логін"></input>
            <div className="block-reg-password">
                <input 
                    type={passwordChek ? "text" : "password"} 
                    className={`reg-password ${password === passwordConfirm ? "" : "error-password"}`}
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
                    className={`reg-password-confirm ${password === passwordConfirm ? "" : "error-password"}`}
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
                onClick={() => {
                    loginQuery({login, password})
                    console.log(password , login)
                    setLogin("")
                    setPassword("")
                    setPasswordConfirm("")
                }}
                disabled={password === "" || password !== passwordConfirm}
            
            >Зареєструватися</button>

            <p className="reg-massge">{password === passwordConfirm ? "" : "Паролі не співпадають"}</p>
        </div>
    )
}

export default Registration