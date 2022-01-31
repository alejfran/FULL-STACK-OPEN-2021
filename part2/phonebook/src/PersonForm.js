import React from "react";

const PersonForm = ({ handleSubmit, handleChangeName, handleChangeNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "block" }}>
        <div>
          name: <input onChange={handleChangeName} />
        </div>
        <div>
          number: <input onChange={handleChangeNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
