import React from "react";
import { Part } from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      <Part exercises={parts[0].exercises} part={parts[0].name} />
      <Part exercises={parts[1].exercises} part={parts[1].name} />
      <Part exercises={parts[2].exercises} part={parts[2].name} />
    </>
  );
};

export default Content;
