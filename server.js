const mongoose = require("mongoose")
require("dotenv").config();
const person = require("./models/person") 

//         , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
//         }

let uri = process.env.MONGO_URI;
mongoose
.connect(uri)
.then(() => console.log("connected to database"))
.catch((err) => console.error("Error connecting to database:", err));

const person1 = new person({
  name: "Arthur Knight",
  age: 28,
  favoriteFoods: ["Pizza", "Burgers"],
  email: "Arthur.Knight@gmail.com",
  address: "123 Main St, Springfield, IL",
});

person1
  .save()
  .then(() =>
    console.log("person1 has been added to database")
  )
  .catch((err) =>
    console.error('Error adding person1', err));

person
  .create([
    {
      name: "Sean Drake",
      age: 20,
      favoriteFoods: ["Pizza", "Burgers"],
      email: "ezis@mo.sn",
      address: "35 Main St, Springfield, IL",
    },
    {
      name: "Virgie Pope",
      age: 30,
      favoriteFoods: ["Pizza", "Burgers"],
      email: "nus@dizir.gf",
      address: "255 Main St, Springfield, IL",
    },
    {
      name: "Landon Oliver",
      age: 32,
      favoriteFoods: ["Pizza", "Burgers"],
      email: "zu@sefobcop.net",
      address: "04 Main St, Springfield, IL",
    },
    {
      name: "Agnes Crawford",
      age: 14,
      favoriteFoods: ["Pizza", "Burgers"],
      email: "mulatod@gulnigze.dk",
      address: "25 Main St, Springfield, IL",
    },
  ])
  .then((createdPersons) => {
    console.log("People created ", createdPersons);
  })
  .catch((err) => {
    console.error("Error creating people ", err);
  });


person.find({ name: "Agnes Crawford" })
  .then((people) => {
    console.log("People found with the name Agnes Crawford", people);
  })
  .catch((err) => {
    console.error("Error finding people by name Agnes Crawford", err)
  });

person.findOne({ address: "04 Main St, Springfield, IL" })
    .then((person) => console.log("person found with the address 04 Main St, Springfield, IL ", person))
    .catch((err) => console.log("Error finding person by address 04 Main St, Springfield, IL", err));


person.findById("672dcbdded3588d53f480b55")
  .then((person) => {
    console.log("Person found with the given _id:", person);
  })
  .catch((err) => console.error("Error finding person by _id:", err));


person
  .findById("672e8537d1290e28e327c634")
  .then((person) => {
   
    person.favoriteFoods.push("hamburger");

    return person.save();
  })
  .then((updatedPerson) => {
    console.log("Updated Person:", updatedPerson);
  })
  .catch((err) => {
    console.error("Error updating person:", err);
  });

person
  .findOneAndUpdate({ name: "Agnes Crawford" }, { age: 20 }, { new: true })
  .then((updatedPerson) => {
    console.log("Updated Person:", updatedPerson);
  })
  .catch((err) => {
    console.error("Error updating person:", err);
  });

person
  .findByIdAndDelete("672e8537d1290e28e327c635")
  .then((removedPerson) => {
    console.log("Removed Person:", removedPerson);
  })
  .catch((err) => {
    console.error("Error removing person:", err);
  });


person
  .remove({ name: "Landon Oliver" }) 
  .then((result) => {
    console.log("Delete result:", result);
  })
  .catch((err) => {
    console.error("Error deleting people with name Mary:", err);
  });

person
  .find({ favoriteFoods: "Pizza" }) 
  .sort({ name: 1 }) 
  .limit(2) 
  .select("-age") 
  .exec() 
  .then((data) => {
    console.log("Found People:", data); 
  })
  .catch((err) => {
    console.error("Error finding people:", err); 
  });
