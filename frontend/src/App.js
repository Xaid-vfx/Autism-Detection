import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import Results from './Results';
import { Routes, Route } from "react-router-dom"

function App() {
  const [sub, setsub] = useState(true)
  const [input, setinput] = useState(false)
  function isSubmitted(input) {
    setinput(input)
    setsub(false)
  }

  function retake() {
    setsub(true)
  }
  return (
    <div className="App">
      {sub ? <QuestionForm isSubmitted={isSubmitted} /> : <Results input={input} retake={retake} />}
    </div>
  );
}

export default App;
