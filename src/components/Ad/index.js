import React from "react";
import { Link } from "react-router-dom";
import dateCreatedAt from "../../utils/date";

const AdComponent = ({ Ad, loading }) => {
  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="block-Ad">
      {Ad.map((obj) => (
        <div className="Ad" key={obj._id}>
          <Link to={`/Ad/${obj._id}`}>
            <div>
              <img
                src={
                  obj.images
                    ? obj.images.length > 0
                      ? "http://marketplace.node.ed.asmer.org.ua/" +
                        obj.images[0].url
                      : "https://via.placeholder.com/200x150"
                    : "https://via.placeholder.com/200x150"
                }
              />
            </div>
            <h4 className="title-Ad">{obj.title}</h4>
          </Link>
          <p>{obj.price} грн.</p>
          <address>
            {obj.address}
            {obj.address && <span className="icon-location2" />}
          </address>
          <span className="time-Ad">{dateCreatedAt(obj.createdAt)}</span>
          <div className="block-tags-Ad">
            {obj.tags
              ? obj.tags.length > 0
                ? obj.tags.map((el, i) => (
                    <Link className="tags-Ad" key={el} to={`/tags/${el}`}>
                      {el} {obj.tags.length !== i + 1 && ","}
                    </Link>
                  ))
                : ""
              : ""}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdComponent;
