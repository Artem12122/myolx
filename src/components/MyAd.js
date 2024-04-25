import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAdMyQuery } from "../store/api";
import AdComponent from "./Ad";

const MyAd = () => {
  const user = useSelector((state) => state.auth.userInfo);

  const { isLoading, data } = useGetAdMyQuery(user?._id);

  if (!user) return <h2>Ви не увійшли в укаунт!</h2>;

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="perent-my-ad">
      <h2>Мої оголошення</h2>

      <h4 className="my-ad-h4">
        <Link className="my-ad-link" to="/My/Ad/new">
          Створити нове оголошення
        </Link>
      </h4>

      {data.AdFind.length === 0 ? (
        <div className="my-ad-massege">Оголошень немає</div>
      ) : (
        <AdComponent Ad={data.AdFind} loading={isLoading} />
      )}
    </div>
  );
};

export default MyAd;
