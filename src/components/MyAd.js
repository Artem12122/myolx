import React, { useState, useEffect, useRef } from "react";
import {
  Router,
  Route,
  Link,
  NavLink,
  Redirect,
  useParams,
  Switch,
} from "react-router-dom";
import { useGetAdMyQuery } from "../store/api";
import { useSelector } from "react-redux";

const MyAd = () => {
  const user = useSelector((state) => state.auth.userInfo);

  const { isLoading, data } = useGetAdMyQuery(user?._id);

  if (!user) return <h2>Ви не увійшли в укаунт!</h2>;

  if (isLoading) return <h2>Loading...</h2>;

  console.log(data.AdFind.length);

  return (
    <div className="patent-my-ad">
      <h2>Мої оголошення</h2>
      <Link to="/My/Ad/new">
        <h4>Створити нове оголошення</h4>
      </Link>
      
      {data.AdFind.length === 0 ? <div>Оголошень не має</div> : <div>gdfhg</div>}
    </div>
  );
};

export default MyAd;
