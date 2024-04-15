import React, { useState, useEffect, useRef } from "react";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";

const InputAddArr = ({ arr, setArr, editState, ...props }) => {
  const [phoneKeys, setPhoneKeys] = useState([uuidv4()]);

  useEffect(() => {
    if (arr !== null && arr.length > 0) {
      const count = arr.length + 1 - phoneKeys.length;

      let newPhoneKeys = [...phoneKeys]

      for (let i = 0; i < count; i++) {
        newPhoneKeys = [...newPhoneKeys, uuidv4()]
      }
      setPhoneKeys(newPhoneKeys);
    } else {
      setPhoneKeys([uuidv4()]);
    }
  }, [arr]);

  const removePhoneNumber = (el) => {
    const index = phoneKeys.indexOf(el);
    const updatedPhoneKeys = phoneKeys.filter((element) => element !== el);
    const updatedPhoneNumbers = [...arr];

    updatedPhoneNumbers.splice(index, 1);
    setPhoneKeys(updatedPhoneKeys);
    setArr(updatedPhoneNumbers);
  };

  return (
    <div className="phonebook">
      {phoneKeys.map((el) => (
        <div key={el}>
          <Input
            arr={arr}
            setArr={setArr}
            index={phoneKeys.indexOf(el)}
            editState={editState}
            {...props}
          />
          {!editState && phoneKeys.length !== phoneKeys.indexOf(el) + 1 && (
            <button onClick={() => removePhoneNumber(el)}>⌫</button>
          )}
          <br />
        </div>
      ))}
    </div>
  );
};

export default InputAddArr;
