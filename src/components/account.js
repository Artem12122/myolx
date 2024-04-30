import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionApdateUser } from "../store/Thunk/actionApdateUser";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import authSlice from "../store/authSlice/authSlice";
import dateCreatedAt from "../utils/date";
import DropzoneOneFile from "./DropzoneOneFile";
import InputAddArr from "./inputAddArr";
import placeholder from "../images/placeholder.png";


const Account = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);

  const [editState, setEditState] = useState(true);
  const [loginVal, setLoginVal] = useState(user?.login);
  const [nickVal, setNickVal] = useState(user?.nick);
  const [phonesVal, setPhonesVal] = useState(user?.phones);
  const [addressesVal, setaddressesVal] = useState(user?.addresses);
  const [avatarVal, setAvatarVal] = useState(user?.avatar);

  useEffect(() => {
    if (user) {
      setLoginVal(user?.login);
      setNickVal(user?.nick);
      setPhonesVal(user?.phones);
      setaddressesVal(user?.addresses);
      setAvatarVal(user?.avatar);
    }
  }, [user]);

  const createUser = async () => {
    const { avatar, createdAt, ...newUser } = user;

    newUser.login = loginVal;
    newUser.nick = nickVal;
    newUser.phones = phonesVal;
    newUser.addresses = addressesVal;
    if (avatarVal?._id) {
      newUser.avatar = { _id: avatarVal._id };
    }

    await dispatch(actionApdateUser({ newUser }));
  };

  const logout = () => {
    if (window.confirm("Ви дійсно хочете вийти")) {
      dispatch(authSlice.actions.logout());
      history.push("/login");
    }
  };

  if (!user) {
    return <h2>Ви не увійшли в укаунт!</h2>;
  }

  return (
    <div className="account">
      <div className="account-img-block">
        {!editState && <DropzoneOneFile setAvatar={setAvatarVal} />}
        <img
          className="account-img"
          style={{ opacity: !editState ? 0.5 : 1 }}
          src={
            avatarVal === null
              ? placeholder
              : "http://marketplace.node.ed.asmer.org.ua/" + avatarVal.url
          }
        />
      </div>
      <div className="account-login">
        <h5>Логін</h5>
        <input
          onChange={(e) => {
            e.target.value.length > 1 && setLoginVal(e.target.value);
          }}
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
          min={4}
          max={12}
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
          min={2}
          max={24}
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
          !editState && history.go()
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
          }}
        >
          Зберегти
        </button>
      )}
      <button className="account-btn-del" onClick={logout}>
        Вийти з акаунту {loginVal}
      </button>
    </div>
  );
};

export default Account;
