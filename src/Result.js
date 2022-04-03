import React from "react";

const Result = (props) => {
  return (
    <div>
      <p>
        You answered correctly {props.correctAnswers} out of{" "}
        {props.totalAnswers}
      </p>
    </div>
  );
};

export default Result;
