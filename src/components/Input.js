import React, { useState, useEffect, useRef } from "react";

const Input = ({
  arr,
  setArr,
  index,
  editState,
  setErrorMassage,
  ...props
}) => {
  const [inputValue, setInputValue] = useState((arr && arr[index]) || "");
  const [editStateInput, setEditStateInput] = useState(
    arr && arr[index] ? true : false
  );
  const [noneInput, setNoneInput] = useState("");
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    setNoneInput("");
    arr && editState && arr.length > 0 && index === arr.length
      ? setNoneInput("none")
      : setNoneInput("");
  }, [arr, editState]);


  const validateText = (e) => {
    const newValue = e.target.value;
    if (newValue.length > 3) {
      if (!arr.filter((e, i) => i !== index).includes(newValue)) {
        setBtn(false);
        setErrorMassage("");
        setInputValue(newValue);
      } else {
        setBtn(true);
        setErrorMassage("Це значення вже існує");
      }
    } else {
      setBtn(true);
      setErrorMassage("Не меньше 3 символів");
    }
  };

  const addNumber = () => {
    if (arr) {
      if (!editStateInput) {
        const newArr = [...arr];
        newArr[index] = inputValue;
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
        onChange={(e) => {
          validateText(e);
          setInputValue(e.target.value);
        }}
        {...props}
      />
      {!editState && (
        <button onClick={addNumber} disabled={btn}>
          {editStateInput ? "Змінити" : "Додати"}
        </button>
      )}
    </>
  );
};

export default Input;
