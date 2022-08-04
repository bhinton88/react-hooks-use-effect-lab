import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // timeRemaining is currently set to 10 seconds 
  // need some logic to figure out if our timeRemaining is at 0 or not
  // when at  0 we need to setTimeRemaining to 10 and provide onAnswered with
  // a false argument 

  useEffect(() => {
    const timer = setTimeout(()=> {
      if(timeRemaining === 0){
        setTimeRemaining(10)
        onAnswered(false)
      } else {
       setTimeRemaining(timeRemaining => timeRemaining - 1)
      }
    }, 1000)

    return function cleanup() {
      clearTimeout(timer)
    }
  },[timeRemaining])

  // add useEffect code

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
