import React from "react";
import Nation from "./Nation";
import { NationList } from "./NationList";

const Nations = ({ results }) => {
  if (results && results.length === 0) {
    return <p>There are no results available</p>;
  } else if (results.length > 11) {
    return <p>Too many matches, specify another filter</p>;
  } else if (results.length === 1) {
    return <Nation nation={results[0]} />;
  } else {
    return <NationList nations={results} />;
  }
};

export default Nations;
