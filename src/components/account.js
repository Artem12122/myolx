import { useDispatch, useSelector } from "react-redux";
import authSlice from "../store/authSlice/authSlice";
import dateCreatedAt from "../utils/date";
import React, { useState, useEffect, useRef } from "react";
import { actionApdateUser } from "../store/Thunk/actionApdateUser";
import InputAddArr from "./inputAddArr";
import { history } from "../store/api";

const Account = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userInfo);

  const [editState, setEditState] = useState(true);
  const [loginVal, setLoginVal] = useState(user?.login);
  const [nickVal, setNickVal] = useState(user?.nick);
  const [phonesVal, setPhonesVal] = useState(user?.phones);
  const [addressesVal, setaddressesVal] = useState(user?.addresses);

  useEffect(() => {
    if (user) {
      setLoginVal(user?.login);
      setNickVal(user?.nick);
      setPhonesVal(user?.phones);
      setaddressesVal(user?.addresses);
    }
  }, [user]);

  const createUser = async () => {
    const { createdAt, ...newUser } = user;

    newUser.login = loginVal;
    newUser.nick = nickVal;
    newUser.phones = phonesVal;
    newUser.addresses = addressesVal;

    await dispatch(actionApdateUser({ newUser }));
  };

  const logout = () => {
    if (window.confirm("Ви дійсно хочете вийти")) {
      dispatch(authSlice.actions.logout());
      history.push("/login");
    }
  }

  if (user === null) {
    return <h2>Ви не увійшли в укаунт!</h2>;
  }

  return (
    <div className="account">
      <div className="account-img-block">
        <img
          className="account-img"
          src={
            user.avatar === null
              ? "https://via.placeholder.com/200x150"
              : user.avatar.url
          }
        />
      </div>
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
      <div className="account-time">
        На MyOLX з {dateCreatedAt(user.createdAt)}
      </div>

      <button
        className="account-btn-edit"
        onClick={() => {
          setEditState(!editState);
          !editState && window.location.reload();
        }}
      >
        {editState ? "Редагувати профіль" : "Скасувати зміни"}
      </button>
      {!editState && (
        <button
          className="account-btn-save"
          onClick={() => {
            createUser();
            setEditState(!editState);
            // window.location.reload();
          }}
        >
          Зберегти
        </button>
      )}
      <button
        className="account-btn-del"
        onClick={logout}
      >
        Вийти з акаунту {loginVal}
      </button>
    </div>
  );
};

export default Account;
