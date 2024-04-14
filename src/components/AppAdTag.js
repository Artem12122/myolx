import React, { useEffect, useState } from "react";
import AdComponent from "./Ad";
import Pagination from "./Pagination";
import { useGetAllAdTaggQuery } from "../store/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const AppAdTagg = () => {
  const [adArr, setAdArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [AdPerPage, setAdPerPage] = useState(12);

  const { tag } = useParams()

  const {isLoading, data} = useGetAllAdTaggQuery({tag})

  useEffect(() => {
    if (!data) return
    setAdArr(data?.AdFind)
  }, [currentPage, isLoading, data, tag]);

  const lastAdIndex = currentPage * AdPerPage;
  const firstAdIndex = lastAdIndex - AdPerPage;

  const currentAd = adArr.slice(firstAdIndex, lastAdIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="parent-Ad">
      <h2>Оголошення за тегом: {tag}</h2>
      <AdComponent Ad={currentAd} loading={isLoading} />
      <Pagination
        AdPerPage={AdPerPage}
        totalAd={adArr.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AppAdTagg;