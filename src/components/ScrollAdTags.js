import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { actionLoaderNextTags } from "../store/Thunk/actionLoaderNext";
import { useGetAllAdCountTagsQuery } from "../store/api";
import AdComponent from "./Ad";

const ScrollAdTags = () => {
  const dispatch = useDispatch();

  const { tag } = useParams();
  const ad = useSelector((state) => state.feed.payloadTags);
  const { isLoading, data: count } = useGetAllAdCountTagsQuery(tag);

  useEffect(() => {
    dispatch(actionLoaderNextTags(tag))
  }, [tag]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [tag, count, ad]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && ad.length < count?.AdCount ) {
      dispatch(actionLoaderNextTags(tag))
    }
  };

  return (
    <div className="parent-Ad">
      <h2>Оголошення</h2>
      <AdComponent Ad={ad} loading={isLoading} />
    </div>
  );
};

export default ScrollAdTags;
