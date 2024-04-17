import React, { useState, useEffect, useRef } from "react";
import {
  Router,
  Route,
  Link,
  Redirect,
  useParams,
  Switch,
} from "react-router-dom";
import Comments from "./Comments";
import AddComment from "./AddComment";
import dateCreatedAt from "../utils/date";
import { useGetAdOneQuery } from "../store/api";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCreative,
  HashNavigation,
  Keyboard,
  Scrollbar,
} from "swiper/modules";

import "swiper/css/bundle";

const AdOne = () => {
  const { _id } = useParams();
  const { isFetching, data } = useGetAdOneQuery({ _id });

  if (isFetching) return <h2>Loading...</h2>;
  const { AdFindOne } = data;

  return (
    <div className="parent-AdOne">
      <div className="AdOne-main">
        <div className="AdOne-img-block">
          <Swiper
            modules={[
              Navigation,
              Pagination,
              EffectCreative,
              HashNavigation,
              Keyboard,
              Scrollbar,
            ]}
            loop={true}
            centeredSlides={true}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: false,
                opacity: 0,
                translate: [0, 0, -400],
              },
              next: {
                opacity: 1,
                translate: ["100%", 0, 0],
              },
            }}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{
              type: "fraction",
            }}
            scrollbar={{
              hide: true,
            }}
            grabCursor={true}
            hashNavigation={{
              watchState: true,
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
              pageUpDown: true,
            }}
          >
            {AdFindOne?.images !== null && AdFindOne?.images.length > 0 ? (
              AdFindOne.images.map((image, index) => (
                <SwiperSlide key={index} data-hash={`slide${index}`}>
                  <img
                    src={"http://marketplace.node.ed.asmer.org.ua/" + image.url}
                    alt={image.text}
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <img
                  src="https://via.placeholder.com/200x150"
                  alt="Зображення відсутнє"
                />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className="AdOne-description">
          <div>
            <h4 className="AdOne-description-title">Опис</h4>
            <p>{AdFindOne.description}</p>
          </div>
          <div className="block-tags-Ad">
            {AdFindOne.tags &&
              AdFindOne.tags.length > 0 &&
              AdFindOne.tags.map((el, i) => (
                <Link className="tags-Ad" key={el} to={`/tags/${el}`}>
                  {el} {AdFindOne.tags.length !== i + 1 && ","}
                </Link>
              ))}
          </div>
        </div>

        <div className="AdOne-comments">
          <h4>Коментарі</h4>
          <AddComment _id={_id} />
          <div className="block-comments">
            {AdFindOne.comments &&
              AdFindOne.comments.length > 0 &&
              AdFindOne.comments
                .slice()
                .reverse()
                .map((el) => <Comments key={el._id} objComent={el} />)}
          </div>
        </div>
      </div>

      <div className="AdOne-aside">
        <div className="AdOne-title">
          <div className="AdOne-title-time">
            Опубліковано {dateCreatedAt(AdFindOne.createdAt)}
          </div>
          <h4>{AdFindOne.title}</h4>
          <div className="AdOne-title-price">{AdFindOne.price} грн.</div>
          <Link to="/message">
            <button className="AdOne-title-message">Повідомлення</button>
          </Link>
        </div>

        <div className="AdOne-owner">
          <h4 className="AdOne-owner-title">Користувач</h4>
          <div className="owner">
            {AdFindOne.owner.avatar === null ? (
              <div className="icon-user" />
            ) : (
              <img
                src={
                  "http://marketplace.node.ed.asmer.org.ua/" +
                  AdFindOne.owner.avatar.url
                }
              />
            )}
            <p>{AdFindOne.owner.login}</p>
            <div className="owner-time">
              На MyOLX з {dateCreatedAt(AdFindOne.owner.createdAt)}
            </div>
          </div>
          <div className="owner-adress">
            {AdFindOne.address !== null && (
              <>
                {AdFindOne.address}
                <span className="icon-location2"></span>
              </>
            )}
          </div>
          <div className="owner-all-ad">
            <a href={`/Ad/${AdFindOne._id}`}>
              Інші оголошення автора <span className="icon-redo2"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdOne;
