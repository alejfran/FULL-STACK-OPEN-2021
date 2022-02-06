import React, { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import Persons from "./Persons";
import apiService from "./apiService";
import Notification from "./Notification";
import "./App.css";
import { set } from "mongoose";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState({
    type: "",
    content: "",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    apiService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleChangeName = (e) => {
    setNewName(e.target.value);
    console.log(newName);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
    console.log(newNumber);
  };

  const searchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let includes = persons.map((person) => person.name).includes(newName);

    if (!includes) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      apiService
        .create(personObject)
        .then((createdNote) => {
          setPersons([...persons, createdNote]);
          setMessage({ type: "Message", content: `Added ${newName}` });
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response);
          setMessage({ type: "error", content: error.response.data.error });
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
          }, 5000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, do you want to update the number with this new one?`
        )
      ) {
        const index = persons
          .map((person) => person.name)
          .findIndex((name) => name === newName);

        const personId = persons[index].id;

        const newObject = {
          ...persons[index],
          number: newNumber,
        };

        apiService
          .update(personId, newObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personId ? person : updatedPerson
              )
            );
          })
          .catch((error) => {
            setMessage({
              type: "error",
              content: error.response.data.error,
            });
            //setPersons(persons.filter((person) => person.id !== personId));
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
            }, 5000);
          });
      }
    }
  };

  const deleteFunction = (id) => {
    if (window.confirm(`Do you really want to delete this person ?`)) {
      apiService.deletePerson(id).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };
  return (
    <div>
      <h1>Phonebook</h1>
      {visible && <Notification message={message} />}
      <Filter searchChange={searchChange} />
      <h1>Add a new</h1>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons
        searchInput={searchInput}
        persons={persons}
        deleteFunction={deleteFunction}
      />
    </div>
  );
};

export default App;
