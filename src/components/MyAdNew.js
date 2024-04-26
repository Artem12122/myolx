import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { actionNewAd } from "../store/Thunk/actionNewAd";
import DropzoneArr from "./DropzoneArr";
import InputAddArr from "./inputAddArr";
import { ArrowLeft } from "lucide-react";

const MyAdNew = ({ _id, titleAD="", descriptionAd="", tagsAd=[], addressAd="", priceAd=0}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const imagesState = useSelector((state) => state.feed.payloadImages);

  const [title, setTitle] = useState(titleAD);
  const [description, setDescription] = useState(descriptionAd);
  const [tags, setTags] = useState(tagsAd);
  const [address, setAdress] = useState(addressAd);
  const [price, setPrice] = useState(priceAd);

  const createAd = async (e) => {
    e.preventDefault();

    if (title.length < 5 || price.length < 1 || address.length < 2) {
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
      address: address,
      price: +price,
    };
    _id && (newAd._id = _id)
    
    const _idNew = await dispatch(actionNewAd(newAd));

    history.push(`/Ad/${_idNew}`);
  };

  return (
    <>
      <div className="goBack-my-ad-new" onClick={history.goBack}>
        <ArrowLeft size={32} />
      </div>
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
          type="text"
          className="adress"
          onChange={(e) => setAdress(e.target.value)}
          value={address}
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
    </>
  );
};

export default MyAdNew;
