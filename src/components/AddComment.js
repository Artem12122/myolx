import React, { useState, useParams } from "react";
import { useAddCommentMutation } from "../store/api";

const AddComment = ({_id, setLoading}) => {
  const [text, setText] = useState("");
  const [loginQuery, {isLoading, data}] = useAddCommentMutation()

  return (
    <div className="add-comment">
      <input
        placeholder="Залишіть свій відгук про цей товар"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button
        onClick={() => {
          loginQuery({_id, text})
          setText("");
        }}
      >
        Додати коментар
      </button>
    </div>
  );
};

export default AddComment;
