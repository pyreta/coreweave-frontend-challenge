import React, { useRef, } from "react";
import { makeRandomString } from "../utils/transformations";
import Button from "./Button";

const ArrayGenerator = ({ length, setArray }) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value &&
      setArray(
        new Array(parseInt(inputRef.current.value, 10))
          .fill(null)
          .map(() => makeRandomString(5))
        );
    }

  return (
    <>
      {!length && <p>Array not generated</p>}
      <Button text={"Generate random array"} onClick={handleClick} />
      <label htmlFor="length">of length:</label>
      <input ref={inputRef} type="number" name="length" min="1" max="10000" />
    </>
  )
};

export default ArrayGenerator;