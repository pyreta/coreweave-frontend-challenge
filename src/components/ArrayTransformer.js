import React, { useState, useEffect } from "react";
import List from "./List";
import Button from "./Button";
import { shuffle, swapCase, makeRandomString } from "../utils/transformations";

export const arrayChangingFunctions = {
  "Scramble each element": { fn: shuffle, method: "map" },
  "Swap case of each element": { fn: swapCase, method: "map" },
  "Add random character to each element": {
    fn: (x) => `${x}${makeRandomString(1)}`,
    method: "map",
  },
  "Remove elements with a capital B": {
    fn: (x) => !x.includes("B"),
    method: "filter",
  },
};

const ArrayTransformer = ({inputArray, outputArray, setOutputArray, setRuntime}) => {
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState(false);

  const firstEl = outputArray[0];
  const len = outputArray.length;

  useEffect(() => {
    setLoading(false);
  }, [firstEl, len]);

  useEffect(() => {
    if (loading && inputArray) {
      let startTime = performance.now();
      let newArr = inputArray;
      changes.forEach((change, i) => {
        const { method, fn } = arrayChangingFunctions[change];
        newArr = newArr[method](fn);
      });
      let finishTime = performance.now();
      setRuntime(finishTime - startTime);
      setOutputArray(newArr);
    }
  }, [loading, changes, inputArray, setOutputArray, setRuntime]);


  return (
    <>
      <div>Transformations</div>
      <div>
        {Object.keys(arrayChangingFunctions).map((text) => (
          <button key={text} text={text} onClick={() => setChanges([...changes, text])}>{text}</button>
        ))}
      </div>
      <List listItems={changes} />
      <Button
        text={loading ? "Applying your changes..." : "Apply changes to array"}
        disabled={loading}
        onClick={() => {
          if (inputArray.length > 0 && changes.length > 0) setLoading(true);
        }}
      />
    </>
  )
};

export default ArrayTransformer;

