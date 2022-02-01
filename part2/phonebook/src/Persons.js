import React from "react";

const Persons = ({ persons, searchInput, deleteFunction }) => {
  return (
    <>
      {persons.map(
        (person, index) =>
          person.name.includes(searchInput) && (
            <div
              key={person.name}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>
                {person.name} {person.number}
              </p>
              <button
                onClick={() => deleteFunction(person.id)}
                style={{
                  marginLeft: "5px",
                  height: "50%",
                }}
              >
                delete
              </button>
            </div>
          )
      )}
    </>
  );
};

export default Persons;
