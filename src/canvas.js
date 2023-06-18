import React, { useState, useEffect } from "react";
import "./style.css";
import Canvas from "./canvas";
import firebase from "./firebase";

const App = () => {
  // Define the state of the component
  const [distance, setDistance] = useState(0);

  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const getValue = firebase.database().ref("distance");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      // Whenever the value changes on the server, it is also reset on the running app through the variable
      setDistance(value.toFixed(2));
    });
  }, []);

  return (
    <div className="litreDisplay">
      <div className="canvas">
        {/* The variable is passed down to the Canvas component, which will re-render every time its altered*/} 
        <Canvas distance={distance} />
      </div>
      <div className="displayValue">
        <span>{distance}cm</span>
      </div>
    </div>
  );
};

export default App;