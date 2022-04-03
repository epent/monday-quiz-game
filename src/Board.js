import React, { useState, useEffect } from "react";
var he = require("he");

const Board = () => {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    fetch("/.netlify/functions/game-data")
      .then((response) => response.json())
      .then((data) => {
        console.log(he.decode(data.results[0].question));
        console.log(data.results);
        setGameData(data.results);
      });
  }, []);

  let question;
  if (gameData) {
    question = he.decode(gameData[0].question);
  }

  let answer1;
  if (gameData) {
    answer1 = he.decode(gameData[0].correct_answer);
  }

  let answer2;
  if (gameData) {
    answer2 = he.decode(gameData[0].incorrect_answers[0]);
  }
  let answer3;
  if (gameData && gameData[0].incorrect_answers[1]) {
    answer3 = he.decode(gameData[0].incorrect_answers[1]);
  }
  let answer4;
  if (gameData && gameData[0].incorrect_answers[2]) {
    answer4 = he.decode(gameData[0].incorrect_answers[2]);
  }

  return (
    <div>
      <p>{question}</p>
      <p>Answer 1: {answer1}</p>
      <p>Answer 2: {answer2}</p>
      <p>Answer 3: {answer3}</p>
      <p>Answer 4: {answer4}</p>
    </div>
  );
};

export default Board;
