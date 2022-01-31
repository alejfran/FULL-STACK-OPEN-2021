import React from "react";

const Total = ({ course }) => {
  let sum = 0;

  sum = course.parts
    .map((part) => part.exercises)
    .reduce((prev, current) => prev + current);

  return <b>Number of exercises {sum}</b>;
};

export default Total;
