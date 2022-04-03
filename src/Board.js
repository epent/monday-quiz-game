import React, { useState, useEffect } from "react";
var he = require("he");

const Board = () => {
  const [gameData, setGameData] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    fetch("/.netlify/functions/game-data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results.slice(0, 10));
        setGameData(data.results.slice(0, 10));
        console.log(questionCount);
      });
  }, []);

  let questionData = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  };
  if (gameData) {
    questionData = {
      question: he.decode(gameData[questionCount].question),
      answer1: he.decode(gameData[questionCount].correct_answer),
      answer2: he.decode(gameData[questionCount].incorrect_answers[0]),
      answer3: gameData[questionCount].incorrect_answers[1]
        ? he.decode(gameData[questionCount].incorrect_answers[1])
        : null,
      answer4: gameData[questionCount].incorrect_answers[2]
        ? he.decode(gameData[questionCount].incorrect_answers[2])
        : null,
    };
  }

  const updateQuestionHandler = () => {
    setQuestionCount((prevState) => prevState + 1);
  };

  return (
    <div>
      <p>{questionData.question}</p>
      <button onClick={updateQuestionHandler}>{questionData.answer1}</button>
      <button>{questionData.answer2}</button>
      <button>{questionData.answer3}</button>
      <button>{questionData.answer4}</button>
    </div>
  );
};

export default Board;
