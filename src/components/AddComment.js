import React, { useState } from "react";
import { useAddCommentMutation } from "../store/api";

const AddComment = ({ _id, setLoading }) => {
  const [text, setText] = useState("");
  const [commentQuery, { isLoading, data }] = useAddCommentMutation();

  return (
    <form className="add-comment">
      <input
        type="text"
        placeholder="Залишіть свій відгук про цей товар"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();

          commentQuery({ _id, text });
          setText("");
        }}
      >
        Додати коментар
      </button>
    </form>
  );
};

export default AddComment;
