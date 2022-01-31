import React, { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import Persons from "./Persons";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");

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
      setPersons([...persons, personObject]);
      setNewName("");
      setNewNumber("");
    } else {
      window.alert(newName + " is already added to the PhoneBook");
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchChange={searchChange} />
      <h1>Add a new</h1>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons searchInput={searchInput} persons={persons} />
    </div>
  );
};

export default App;
