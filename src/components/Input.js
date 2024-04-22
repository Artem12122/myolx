import React, { useState, useEffect } from "react";

const Input = ({ arr, setArr, index, editState, setErrorMassage, ...props }) => {
  const [inputValue, setInputValue] = useState((arr && arr[index]) || "");
  const [editStateInput, setEditStateInput] = useState(
    arr && arr[index] ? true : false
  );
  const [noneInput, setNoneInput] = useState("");
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    setInputValue((arr && arr[index]) || "")
    setErrorMassage("");

    setNoneInput("");
    arr && editState && arr.length > 0 && index === arr.length
      ? setNoneInput("none")
      : setNoneInput("");
  }, [arr, editState]);

  const validateText = (e) => {
    const newValue = e.target.value;
    if (newValue.length > 3 && newValue.length < 13) {
      if ( !arr || !arr.filter((e, i) => i !== index).includes(newValue)) {
        setBtn(false);
        setErrorMassage("");
        setInputValue(newValue);
      } else {
        setBtn(true);
        setErrorMassage("Це значення вже існує");
      }
    } else {
      setBtn(true);
      newValue.length < 13
        ? setErrorMassage("Не меньше 4 символів")
        : setErrorMassage("Не більше 12 символів");
    }
  };

  const addNumber = () => {
    if (arr !== null) {
      if (!editStateInput && inputValue.length > 3) {
        const newArr = [...arr];
        newArr[index] = inputValue;
        setArr(newArr);
      }
    } else setArr([inputValue]);

    inputValue.length > 3 && setEditStateInput(!editStateInput);
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
        <button  className="input-btn-edit" onClick={addNumber} disabled={btn}>
          {editStateInput ? "Змінити" : "Додати"}
        </button>
      )}
    </>
  );
};

export default Input;
