import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useGetAdMyQuery } from "../store/api";
import AdComponent from "./Ad";

const AdComponentOwner = () => {
  const { _id } = useParams();
  const { isLoading, data } = useGetAdMyQuery(_id);

  if (isLoading) return <h2>Loading..</h2>;

  return (
    <div className="parent-Ad">
      <h2>Оголошення</h2>
      <AdComponent Ad={data.AdFind} loading={isLoading} />
    </div>
  );
};

export default AdComponentOwner;
