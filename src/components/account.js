import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import authSlice from "../store/authSlice/authSlice";
import store from "../store";
import dateCreatedAt from "../utils/date";
import React, { useState, useEffect, useRef } from "react";
import { actionApdateUser } from "../store/Thunk/actionApdateUser";
import InputAddArr from "./inputAddArr";

const Account = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(store.getState().auth.userInfo);

  const [editState, setEditState] = useState(true);
  const [loginVal, setLoginVal] = useState(user.login);
  const [nickVal, setNickVal] = useState(user.nick);
  const [phonesVal, setPhonesVal] = useState(user.phones);
  const [addressesVal, setaddressesVal] = useState(user.addresses);

  const createUser = async () => {
    const { createdAt, ...newUser } = user;

    newUser.login = loginVal;
    newUser.nick = nickVal;
    newUser.phones = phonesVal
    newUser.addresses = addressesVal

    console.log(newUser);

    await dispatch(actionApdateUser({ newUser }));

    setUser(store.getState().auth.userInfo);
  };

  return (
    <div className="account">
      <img
        className="account-img"
        src={
          user.avatar === null
            ? "https://via.placeholder.com/200x150"
            : user.avatar.url
        }
      />
      <div className="account-login">
        <h5>Логін</h5>
        <input
          onChange={(e) => setLoginVal(e.target.value)}
          type="text"
          value={loginVal}
          disabled={editState}
          placeholder="Логін"
        />
        {!editState && <span className="icon-pencil"></span>}
      </div>
      <div className="account-nick">
        <h5>Нікнейм</h5>
        <input
          onChange={(e) => setNickVal(e.target.value)}
          type="text"
          value={nickVal === null ? "" : nickVal}
          disabled={editState}
          placeholder="Нікнейм"
        />
        {!editState && <span className="icon-pencil"></span>}
      </div>

      <div className="account-phones">
        <h5>Номера телефону</h5>
        <InputAddArr
          arr={phonesVal}
          setArr={setPhonesVal}
          editState={editState}
          
          type="tel"
          name="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          placeholder="Введіть номер телефону"
          />
      </div>
      <div className="account-addresses">
        <h5>Адрасса</h5>
        <InputAddArr
          arr={addressesVal}
          setArr={setaddressesVal}
          editState={editState}
          type="adress"
          placeholder="Введіть адрессу"
        />
      </div>
      <div className="account-addresses">
        На MyOLX з {dateCreatedAt(user.createdAt)}
      </div>

      <button onClick={() => dispatch(authSlice.actions.logout())}>
        выйти из аккаунта {loginVal}
      </button>
      <button 
        className="account-btn-edit"
        onClick={() => {
          setEditState(!editState)
          !editState && window.location.reload()
        }}>
        {editState ? "Редагувати профіль" : "Скасувати зміни"} 
      </button>
      {!editState && (
        <button
          onClick={() => {
            createUser();
            setEditState(!editState);
          }}
        >
          Зберігти
        </button>
      )}
    </div>
  );
};

// {
//     "_id": "66147a454fa34b1b02cd12ae",
//     "login": "artemTst",
//     "nick": null,
//     "createdAt": "1712618053000",
//     "phones": null,
//     "addresses": null,
//     "avatar": null
// }

export default Account;
