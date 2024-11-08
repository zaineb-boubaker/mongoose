const mongoose = require("mongoose");
const schema = mongoose.Schema;



const Person_Prototype = new schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  favoriteFoods: [String],
  email: { type: String, unique: true },
  address: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = person = mongoose.model("person", Person_Prototype);