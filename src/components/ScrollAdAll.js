import React, { useEffect, useState } from "react";
import { useGetAdAllQuery, useGetAllAdCountQuery } from "../store/api";
import AdComponent from "./Ad";

const ScrollAdAll = () => {
  const [ad, setAd] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);

  const { isLoading, data } = useGetAdAllQuery(currentPage);
  const { data: count } = useGetAllAdCountQuery();

  useEffect(() => {
    if (fetching && data) {
        const newAd = [...ad, ...data.AdFind]
        setAd(newAd);
        setCurrentPage((prevPage) => prevPage + 12);
    }
    setFetching(false);
  }, [fetching, data]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [ad]);

  const scrollHandler = (e) => {
    if ( (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) && ad.length < count?.AdCount) {
      setFetching(true);
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
