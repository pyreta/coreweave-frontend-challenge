import React, { useState, useRef, useEffect } from "react";

export const makeRandomString = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result = `${result}${characters.charAt(Math.floor(Math.random() * charactersLength))}`;
  }
  return result;
};

export const swapCase = (letters) => {
  let newLetters = "";
  /*
  * safer to use string interpolation over the += operator.
  * If there are two numbers next to each other that operation might 
  * do a math calculation instead of concatenating the strings
  */
  for(const letter of letters) {
    const newCase = letter === letter.toUpperCase()? letter.toLowerCase() : letter.toUpperCase()
    newLetters = `${newLetters}${newCase}`;
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
  "Scramble each element": { fn: shuffle, method: "_map_" },
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

const operationErrors = new Map();

const App = () => {
  const [randomArray, setRandomArray] = useState([]);
  const [outputArray, setOutputArray] = useState([]);
  const [changes, setChanges] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  const inputRef = useRef();
  const applyCurrentChanges = () => {
    setOutputArray(changes.reduce((output, change) => {
      const { method, fn } = arrayChangingFunctions[change];
      if(typeof output[method] !== 'function') {
        const existingOperation = operationErrors.has(change);
        const errObj = {
          count: existingOperation ? (operationErrors.get(change).count + 1): 1,
          name: method,
          changeType: change,
          message: `Arrays do not contain the method \"${method}\" this operation was skipped`
        };

        operationErrors.set(change, errObj);
      } else {
        output = output[method](fn);
      }

      return output;
    }, [...randomArray]));
    setIsWorking(false);
  }

  const handleApplyChanges = () => {
    if(randomArray.length < 1) {
      alert('Please click \"Generate random array\" first');
      return;
    };

    operationErrors.clear();
    setIsWorking(true);
    applyCurrentChanges();
  }

  const handleAddTransformation = (evt) => {
    const {dataset: { modifier }} = evt.target;
    setChanges((prev) => {
      return [...prev, modifier]
    });
  }

  const handleGenerateRandomArray = () => {
    const currentValue = parseInt(inputRef.current.value, 10);
    if(isNaN(currentValue) || currentValue > Number.MAX_SAFE_INTEGER || currentValue < 0) {
      alert("Please enter a positive inteeger for the length of the array")
      return
    };
    setOutputArray([]);
    setRandomArray(Array.from({length: currentValue}, (vak) => makeRandomString(5)));
  }

  const handleRemoveChange = (evt) => {
    const { dataset: {index}} = evt.target;
    setChanges( changes.filter((_,idx) => {
      return idx !== parseInt(index,10);
    }));
  }

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
        onClick={handleGenerateRandomArray}
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
            data-modifier={text}
            onClick={handleAddTransformation}
          >
            {text}
          </button>
        ))}
      </div>
      <div>
        <ol>
          {!changes.length && <div>No filters selected</div>}
          {
            changes.map((change, idx) => (
              <li className={operationErrors.has(change) ? 'error' : ''} key={`${change}${idx}`}>
                {change} <button disabled={isWorking} data-index={idx} onClick={handleRemoveChange}>remove</button>
              </li>
            ))
          }
        </ol>
      </div>
      <button
        disabled={isWorking || !randomArray.length}
        onClick={handleApplyChanges}
      >
        {isWorking ? "Applying your changes..." : "Apply changes to array"}
      </button>
      <br></br>
      {(outputArray.length > 0) && (
        <div>
          Output array Length:
          {isWorking ? " ...Pending" :outputArray.length}
        </div>
      )}

      {(!isWorking && operationErrors.size > 0) && (
        <>
          <hr />
          <div>Errors during the operation</div>
          {[...operationErrors.values()].map(operation => 
            <div key={makeRandomString(5)} className="operation-error">
              <div>Error Change type: {operation.changeType}</div>
              <div>Error count: {operation.count}</div>
              <div>Error Method: {operation.name}</div>
              <div>Error Message: {operation.message}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
