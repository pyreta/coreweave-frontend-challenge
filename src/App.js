import React, { useState, useRef, useEffect } from "react";

export const makeRandomString = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const swapCase = (letters) => {
  let newLetters = "";
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === letters[i].toLowerCase()) {
      newLetters += letters[i].toUpperCase();
    } else {
      newLetters += letters[i].toLowerCase();
    }
  }
  return newLetters;
};

export const shuffle = (string) => {
  let a = string.split(""),
    n = a.length;

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};

const arrayChangingFunctions = {
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

const App = () => {
  const [randomArray, setRandomArray] = useState();
  const [outputArray, setOutputArray] = useState([]);
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState();

  const inputRef = useRef();
  const firstEl = outputArray[0];
  const len = outputArray.length;

  useEffect(() => {
    setLoading(false);
  }, [firstEl, len]);

  useEffect(() => {
    if (loading) {
      let newArr = randomArray;
      changes.forEach((change, i) => {
        const { method, fn } = arrayChangingFunctions[change];
        newArr = newArr[method](fn);
      });
      setOutputArray(newArr);
    }
  }, [loading, changes, randomArray]);

  return (
    <div>
      <header>The Pointless App</header>
      <p>
        Generate a random string array. Then add as many transformations as you
        want. You can add duplicates of the same transformation. Transformations
        will happen in the order they are added.
      </p>
      {!randomArray.length && <p>Array not generated</p>}
      <button
        onClick={() => {
          setRandomArray(
            new Array(parseInt(inputRef.current.value, 10))
              .fill(null)
              .map(() => makeRandomString(5))
          );
        }}
      >
        Generate random array
      </button>
      <label htmlFor="length">of length:</label>
      <input ref={inputRef} type="number" name="length" min="1" max="10000" />
      <br></br>
      <div>Transformations</div>
      <div>
        {Object.keys(arrayChangingFunctions).map((text) => (
          <button
            key={text}
            onClick={() => {
              setChanges([...changes, text]);
            }}
          >
            {text}
          </button>
        ))}
      </div>
      <div>
        <ol>
          {changes.length ? (
            changes.map((change, idx) => (
              <li key={`${change}${idx}`}>{change}</li>
            ))
          ) : (
            <div>No filters selected</div>
          )}
        </ol>
      </div>
      <button
        disabled={loading}
        onClick={() => {
          setLoading(true);
        }}
      >
        {loading ? "Applying your changes..." : "Apply changes to array"}
      </button>
      <br></br>
      <div>
        Output array Length:
        {outputArray.length}
      </div>
    </div>
  );
};

export default App;
