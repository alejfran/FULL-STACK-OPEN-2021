const mongoose = require("mongoose");
const process = require("process");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://alejfran:${password}@alejfrancluster.vdfw6.mongodb.net/myFirstDatabase?retryWrites=true`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const newPerson = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length === 5) {
  mongoose.connect(url);

  newPerson.save().then(() => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  mongoose.connect(url);
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
