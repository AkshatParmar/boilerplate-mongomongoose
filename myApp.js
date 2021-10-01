require('dotenv').config();
var mongoose = require('mongoose');
var mongodb = require('mongodb');

// Challenge #1 - Connect to DB
mongoose.connect(process.env.MONGO_URI,{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Challenge #2 - Create Schema
const { Schema } = mongoose;

var personSchema = new Schema({
  name:  String, 
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model('Person', personSchema);

// Challenge #3 - Create Doc instance

var createAndSavePerson = (done) => {
  var ZenPar = new Person({
    name: "Zen Parmar",
    age: 1,
    favoriteFoods: ["treats","chicken"]
  });
  console.log(ZenPar);

  ZenPar.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    done(null , data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  // Find
  Person.findById(personId, (err, personToEdit) => {
    if (err) return console.error(err);
    
    // Add
    personToEdit['favoriteFoods'].push(foodToAdd);

    // Save
    personToEdit.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // Find
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, newData) => {
    if (err) return console.log(err);
    console.log(newData);
    done(null, newData);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
