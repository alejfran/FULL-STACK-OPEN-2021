const mongoose = require("mongoose");
require("dotenv").config();
const process = require("process");
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error while connecting to MongoDB", error.message);
  });

const validatePhoneNumber = function (number) {
  if (!number.includes("-")) {
    return number.length === 8;
  } else {
    const splitedNumber = number.split("-");
    const firstPart = splitedNumber[0];
    const secondPart = splitedNumber[1];

    return (
      !isNaN(firstPart) &&
      !isNaN(secondPart) &&
      firstPart.length > 1 &&
      firstPart.length < 4
    );
  }
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: validatePhoneNumber,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
