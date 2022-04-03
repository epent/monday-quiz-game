import React, { useState, useEffect } from "react";
import he from "he";

const NUMBER_OF_QUESTIONS = 10;

const Game = (props) => {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    fetch("/.netlify/functions/game-data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results.slice(0, NUMBER_OF_QUESTIONS));
        setGameData(data.results.slice(0, NUMBER_OF_QUESTIONS));
      });
  }, []);

  const questionData = {
    question: "",
    answers: [],
  };
  if (gameData && props.questionCount !== NUMBER_OF_QUESTIONS) {
    gameData[props.questionCount].incorrect_answers.forEach((answer) => {
      questionData.answers.push(he.decode(answer));
    });

    let max;
    questionData.answers.length > 1 ? (max = 4) : (max = 2);
    const randomNum = Math.floor(Math.random() * max);

    questionData.answers.splice(
      randomNum,
      0,
      he.decode(gameData[props.questionCount].correct_answer)
    );

    questionData.question = he.decode(gameData[props.questionCount].question);
  }

  const answerButtons = questionData.answers.map((answer) => {
    return (
      <button
        onClick={() =>
          props.updateQuestionHandler(
            answer === he.decode(gameData[props.questionCount].correct_answer)
          )
        }
      >
        {answer}
      </button>
    );
  });

  return (
    <div>
      <p>{questionData.question}</p>
      {answerButtons}
    </div>
  );
};

export default Game;
