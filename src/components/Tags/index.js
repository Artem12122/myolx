import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetTagsAllQuery } from "../../store/api";
import { CircleFadingPlus, CircleMinus, CirclePlus } from "lucide-react";

const Tags = () => {
  const { isLoading, data } = useGetTagsAllQuery();
  const [state, setState] = useState(false)

  if (isLoading) return <h2>Loading tags...</h2>;

  const tags = [];

  for (let i = 0; i < data?.AdFind.length; i++) {
    data.AdFind[i].tags.map((el) => {
      tags.includes(el) || tags.push(el);
    });
  }

  return (
    <div className="block-tags">
      <h2>Пошук по тегам на MyOLX {
        <div className="tags-plus-minus" onClick={() => setState(!state)}>
          {state ? <CircleMinus size={32} /> : <CirclePlus size={32} />}
        </div>
      }</h2>
      { state && tags.map((el) => (
        <Link key={el} className="tags" to={`/tags/${el}`}>
          {el}
        </Link>
      ))}
    </div>
  );
};

export default Tags;
