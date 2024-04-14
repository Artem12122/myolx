import React, { useState, useEffect, useRef } from "react";

const Input = ({ arr, setArr, index, editState, type }) => {
  const [inputValue, setInputValue] = useState(arr[index] || "");

  const [editStateInput, setEditStateInput] = useState(false);

  const addNumber = () => {
    if (!editStateInput) {
      console.log(inputValue, arr, index, editState);
      const newArr = [...arr];
      newArr[index] = inputValue;

      setArr(newArr);
      console.log(newArr);
    }
    setEditStateInput(!editStateInput);
  };

  return (
    <>
      <input
        placeholder="Введіть номер телефону"
        disabled={editStateInput || editState}
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {!editState && (
        <button onClick={addNumber}>
          {editStateInput ? "Змінити номер" : "Додати номер"}
        </button>
      )}
    </>
  );
};

export default Input;
