import React, { useEffect, useState } from "react";
import { useGetAllAdTaggQuery } from "../store/api";
import AdComponent from "./Ad";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ScrollAdTags = () => {
  const [ad, setAd] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);

  const { tag } = useParams()
  const {isLoading, data} = useGetAllAdTaggQuery({ tag, skip: [currentPage]})

  useEffect(() => {
    setCurrentPage(0);
    setAd([])
  }, [tag]);

  useEffect(() => {
    if (fetching && data) {
        setAd([...ad, ...data.AdFind]);
        setCurrentPage((prevPage) => prevPage + 12);
    }
    setFetching(false);
  }, [fetching, data, tag]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [ad]);

  const scrollHandler = (e) => {
    if ( e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 ) {
      console.log("scroll");
      setFetching(true);
    }
  };

  console.log(ad)

  return (
    <div className="parent-Ad">
      <h2>Оголошення</h2>
      <AdComponent Ad={ad} loading={isLoading} />
    </div>
  );
};

export default ScrollAdTags;