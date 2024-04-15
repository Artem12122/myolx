import React, { useState, useEffect, useRef } from "react";

const Input = ({ arr, setArr, index, editState, ...props }) => {
  const [inputValue, setInputValue] = useState((arr && arr[index]) || "");

  const [editStateInput, setEditStateInput] = useState(
    arr && arr[index] ? true : false
  );
  const [noneInput, setNoneInput] = useState("");

  useEffect(() => {
    setNoneInput("");

    arr && editState && arr.length > 0 && index === arr.length
      ? setNoneInput("none")
      : setNoneInput("");
      
  }, [arr, editState]);

  const addNumber = () => {
    if (arr) {
      if (!editStateInput && !arr.includes(inputValue)) {
        const newArr = [...arr];
        newArr[index] = inputValue
        setArr(newArr);
      }
    } else setArr([inputValue]);

    setEditStateInput(!editStateInput);
  };

  return (
    <>
      <input
        style={{ display: noneInput }}
        disabled={editStateInput || editState}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        {...props}
      />
      {!editState && (
        <button onClick={addNumber}>
          {editStateInput ? "Змінити" : "Додати"}
        </button>
      )}
    </>
  );
};

export default Input;
