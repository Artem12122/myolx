import React, { useEffect } from "react";
import { useGetAllAdCountQuery } from "../store/api";
import { useDispatch, useSelector } from "react-redux";
import AdComponent from "./Ad";
import { actionLoaderNextAll } from "../store/Thunk/actionLoaderNext";

const ScrollAdAll = () => {
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.feed.payload);
  const { isLoading, data: count } = useGetAllAdCountQuery();

  useEffect(() => {
    dispatch(actionLoaderNextAll())
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [count, ad]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && ad.length < count?.AdCount) {
      dispatch(actionLoaderNextAll())
    }
  };

  return (
    <div className="parent-Ad">
      <h2>Оголошення</h2>
      <AdComponent Ad={ad} loading={isLoading} />
    </div>
  );
};

export default ScrollAdAll;
