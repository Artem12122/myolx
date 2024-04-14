import React, { useState, useEffect, useRef } from "react";
import Input from "./Input";
import userEvent from "@testing-library/user-event";



const InputAddArr = ({ arr, setArr, editState, type }) => {
  const [phoneKeys, setPhoneKeys] = useState([Math.random()])
  const [phoneNumbers, setPhoneNumbers] = useState(arr)

  useEffect(() => {
    const newArr = [...arr]
    // for (let i = 0; i < phoneKeys.length; i++) {
    //   newArr[i] = phoneNumbers[i]
    // }
    phoneKeys.map((el, index) => newArr[index] = phoneNumbers[index] === undefined ? newArr[index] : phoneNumbers[index])

    setArr(newArr)
  }, [phoneNumbers])

  const removePhoneNumber = (el) => {
    console.log(arr, phoneKeys)
    const index = phoneKeys.indexOf(el)
    const updatedPhoneKeys = phoneKeys.filter((element) => element !== el )
    const updatedPhoneNumbers = [...phoneNumbers]
    updatedPhoneNumbers.splice(index, 1)
    setPhoneKeys(updatedPhoneKeys)
    setPhoneNumbers(updatedPhoneNumbers)
  }

  return (
    <div className="phonebook">
      {phoneKeys.map( el =>
        <div key={el}>
          <Input type={type} arr={phoneNumbers} setArr={setPhoneNumbers} index={phoneKeys.indexOf(el)} editState={editState} />
          {!editState && <button onClick={() => removePhoneNumber(el)} >⌫</button>}
          <br />
        </div>
      )}
      {!editState && <button
        style={{padding: "3px 26px"}}
        onClick={() => setPhoneKeys([...phoneKeys, Math.random()] )}
      >+</button>}
    </div>
  )
}


// const InputAddArr = ({ arr, setArr, editState, type }) => {
//   const ref = useRef(null)

//   const addNumber = () => {
//     console.log(ref.current.value)
//   }

//   return (
//     <div>
//       <input
//         ref={ref}
//         type={type}
//       />
//       <button onClick={addNumber}>Додати номер</button>
//     </div>
//   )
// };




// const ArrInput = ({ arr, onInc, editState, type }) => {
//   const [phoneKeys, setPhoneKeys] = useState([]);
//   const [phoneNembers, setPhoneNembers] = useState([]);

//   useEffect(() => {
//     if (arr !== null) {
//       const arrLangth = arr.length;
//       for (let i = 0; i < arrLangth; i++) {
//         setPhoneKeys([...phoneKeys, Math.random()]);
//       }
//     }
//   });

//   const updateNumbers = (e, key) => {
//     console.log(e.target.value);

//     // const updateArr = arr !== null ? [...arr , e.target.value] : [e.target.value]
//     // onInc(updateArr)
//   };

//   console.log(phoneKeys, phoneNembers);
//   return (
//     <div>
//       {phoneKeys.map((key) => (
//         <div key={key}>
//           <input onSelect={(e) => updateNumbers(e, key)} />
//         </div>
//       ))}
//       <button
//         style={{ padding: "3px 26px" }}
//         onClick={() => setPhoneKeys([...phoneKeys, Math.random()])}
//       >
//         +
//       </button>
//     </div>
//   );
// };

export default InputAddArr;
