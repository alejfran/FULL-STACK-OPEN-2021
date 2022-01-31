import React from "react";

const Persons = ({ persons, searchInput }) => {
  return (
    <>
      {persons.map(
        (person) =>
          person.name.includes(searchInput) && (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          )
      )}
    </>
  );
};

export default Persons;
