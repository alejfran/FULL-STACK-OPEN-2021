import React, { useState } from "react";
import Nation from "./Nation";

export const NationList = ({ nations }) => {
  const [show, setShow] = useState(null);

  return (
    <>
      {nations.map((nation, index) => (
        <div key={index}>
          <p>{nation.name.common}</p>
          <button onClick={() => setShow(nation)}>Show</button>
        </div>
      ))}
      {show !== null && <Nation nation={show} />}
    </>
  );
};
