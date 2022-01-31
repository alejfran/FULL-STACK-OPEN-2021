import React from "react";
import Part from "./Part";
const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part, index) => (
        <Part part={part} key={index} />
      ))}
    </div>
  );
};
export default Content;
