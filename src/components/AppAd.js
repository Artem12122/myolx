import React, { useEffect, useState } from "react";
import AdComponent from "./Ad";
import Pagination from "./Pagination";
import { useGetAdAllQuery } from "../store/api";

const AppAd = () => {
  const [adArr, setAdArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [AdPerPage, setAdPerPage] = useState(12);

  const {isLoading, data} = useGetAdAllQuery()

  useEffect(() => {
    if (isLoading || !data) return

    setAdArr(data?.AdFind)

  }, [currentPage, isLoading, data]);

  const lastAdIndex = currentPage * AdPerPage;
  const firstAdIndex = lastAdIndex - AdPerPage;

  const currentAd = adArr.slice(firstAdIndex, lastAdIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="parent-Ad">
      <h2>Оголошення</h2>
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

export default AppAd;
