import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { actionNewAd } from "../store/Thunk/actionNewAd";
import DropzoneArr from "./DropzoneArr";
import InputAddArr from "./inputAddArr";

const MyAdNew = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const imagesState = useSelector((state) => state.feed.payloadImages);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [adress, setAdress] = useState("");
  const [price, setPrice] = useState("");

  const createAd = async (e) => {
    e.preventDefault();

    if (title.length < 5 && price.length < 1 && adress.length < 2) {
      alert("Заповніть поля з зірочкою");
      return;
    }

    const images = imagesState.map((el) => {
      const { _id } = el;
      return { _id };
    });

    const newAd = {
      images: images,
      title: title,
      description: description,
      tags: tags,
      address: adress,
      price: +price,
    };
    const _id = await dispatch(actionNewAd(newAd));

    history.push(`/Ad/${_id}`);
  };

  return (
    <div className="my-ad-new">
      <p>Вкажіть назву*</p>
      <input
        type="text"
        className="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <p>Додайте фото</p>
      <div className="my-ad-new-imges">
        <DropzoneArr />
      </div>
      <p>Додайте опис</p>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        name="description"
        className="description"
      />
      <p>Додайте теги</p>
      <InputAddArr
        min={2}
        max={14}
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
      <button className="my-ad-new-btn" onClick={(e) => createAd(e)}>
        Створити оголошення
      </button>
    </div>
  );
};

export default MyAdNew;
