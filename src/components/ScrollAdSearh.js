import React, { useEffect, useState } from "react";
import { useGetAllAdCountQuery } from "../store/api";
import { useDispatch, useSelector } from "react-redux";
import AdComponent from "./Ad";
import { actionLoaderNextAll } from "../store/Thunk/actionLoaderNext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ScrollAdSearh = () => {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.feed.payload);
  const { isLoading, data: count } = useGetAllAdCountQuery();
  const [searhAd, setSearchAd] = useState([]);
  const { text } = useParams();

  useEffect(() => {
    dispatch(actionLoaderNextAll());
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [count, ad]);

  useEffect(() => {
    if (text) {
      const payloadSearch = ad.filter((value) => {
        if (value.title) {
          return value.title.toLowerCase().includes(text.toLowerCase());
        }
      });
      setSearchAd(payloadSearch);
    }
  }, [text]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && ad.length < count?.AdCount) {
      dispatch(actionLoaderNextAll())
    }
  };

  if (searhAd.length < 1) return <h2>За вашим запитом нічого не знайденно</h2>

  return (
    <div className="parent-Ad">
      <h2>Оголошення</h2>
      <AdComponent Ad={searhAd} loading={isLoading} />
    </div>
  );
};

export default ScrollAdSearh;
