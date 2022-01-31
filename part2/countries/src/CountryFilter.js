import React from "react";

const CountryFilter = ({ handleInputChange }) => {
  return (
    <div>
      <p>find countries</p>
      <input onChange={handleInputChange}></input>
    </div>
  );
};

export default CountryFilter;
