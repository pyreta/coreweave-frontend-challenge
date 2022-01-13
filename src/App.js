import React, { useState } from "react";
import DataWidget from "./components/DataWidget";
import ArrayGenerator from "./components/ArrayGenerator";
import ArrayTransformer from "./components/ArrayTransformer";
import './App.css';

const App = () => {
  const [randomArray, setRandomArray] = useState([]);
  const [outputArray, setOutputArray] = useState([]);
  const [runtime, setRuntime] = useState(0);

  return (
    <div>
      <header>The Pointless App</header>
      <p>
        Generate a random string array. Then add as many transformations as you
        want. You can add duplicates of the same transformation. Transformations
        will happen in the order they are added.
      </p>
      <ArrayGenerator length={randomArray.length} setArray={setRandomArray} />
      <br></br>
      <ArrayTransformer
        inputArray={randomArray}
        outputArray={outputArray}
        setOutputArray={setOutputArray}
        setRuntime={setRuntime}
      />
      <br></br>
      <DataWidget label={"Output array length"} value={outputArray.length} />
      <DataWidget label={"Runtime (ms)"} value={Math.round(runtime)} />
    </div>
  );
};

export default App;