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
import { useCreateNewAdMutation, useGetAdMyQuery } from "../store/api";
import { useSelector } from "react-redux";
import Dropzone from "./DropzoneOneFile";
import InputAddArr from "./inputAddArr";

const MyAdNew = () => {
  const user = useSelector((state) => state.auth.userInfo);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [adress, setAdress] = useState("");
  const [price, setPrice] = useState("");

  const [loginQuery, { isLoading, data }] = useCreateNewAdMutation();

  const createAd = () => {
    const newAd = {
      // images: [],
      title: title,
      description: description,
      tags: tags,
      address: adress,
      price: +price,
    };
    loginQuery(newAd);
    console.log(newAd);
  };

  //   console.log(user ,title, description, tags, adress);

  return (
    <div className="my-ad-new">
      <Dropzone />
      <p>Вкажіть назву*</p>
      <input
        type="text"
        className="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <p>Додайте опис</p>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        name="description"
        className="description"
      />
      <p>Додайте теги</p>
      <InputAddArr
        arr={tags}
        setArr={setTags}
        editState={false}
        type="adress"
        placeholder="Електроніка"
      />
      <p>Додайте адрессу*</p>
      <input
        type="adress"
        className="adress"
        onChange={(e) => setAdress(e.target.value)}
        value={adress}
      />
      <p>Вкажіть ціну*</p>
      <input
        type="number"
        className="price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <button onClick={createAd}>Створити оголошення</button>
    </div>
  );
};

export default MyAdNew;
