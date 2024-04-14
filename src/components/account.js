import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import authSlice from "../store/authSlice/authSlice";
import store from "../store";
import dateCreatedAt from "../utils/date";
import React, { useState, useEffect, useRef } from "react";
import { actionApdateUser } from "../store/Thunk/actionApdateUser";
import InputAddArr from "./inputAddArr";

const Account = () => {
  const { login } = useParams();
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [user, setUser] = useState(store.getState().auth.userInfo);

  const [editState, setEditState] = useState(true);
  const [loginVal, setLoginVal] = useState(user.login);
  const [nickVal, setNickVal] = useState(user.nick);
  const [phonesVal, setPhonesVal] = useState(user.phones);
  const [addressesVal, setaddressesVal] = useState(user.addresses);

  const test = () => {
    console.log(phonesVal);
  };

  const createUser = async () => {
    const { createdAt, ...newUser } = user;

    newUser.login = loginVal;
    newUser.nick = nickVal;
    newUser.phones = phonesVal

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
        <input
          onChange={(e) => setNickVal(e.target.value)}
          type="text"
          value={nickVal}
          disabled={editState}
          placeholder="Нікнейм"
        />
        {!editState && <span className="icon-pencil"></span>}
      </div>

      <div className="account-phones">
        {/* <input
          onChange={(e) => setLoginVal(e.target.value)}
          type="text"
          value={loginVal}
          disabled={editState}
        /> */}

        <InputAddArr
          arr={phonesVal}
          setArr={setPhonesVal}
          editState={editState}
          type={"tel"}
        />

        {/* <ArrInput arr={phonesVal} onInc={setPhonesVal} editState={editState} type={"tel"}/> */}
        {/* <input type="tel" ref={ref}/> */}
        <button onClick={test}>test</button>

        {!editState && <span className="icon-pencil"></span>}
      </div>
      <div className="account-addresses">
        {user.addresses === null ? "anon" : user.addresses}
        <span className="icon-pencil"></span>
      </div>

      <button onClick={() => dispatch(authSlice.actions.logout())}>
        выйти из аккаунта {login}
      </button>
      <button onClick={() => setEditState(!editState)}>
        Редагувати профіль
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

      <div className="account-addresses">
        На MyOLX з {dateCreatedAt(user.createdAt)}
      </div>
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
