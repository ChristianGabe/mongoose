const mongoose = require('mongoose');

//  URI de connexion MongoDB
const MONGO_URI = 'mongodb+srv://cgngoran:O7wzr14YquEg8n8b@christiangabe.tqq5v1i.mongodb.net/?retryWrites=true&w=majority';


// Options de configuration
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connexion à la base de données
mongoose.connect(MONGO_URI, options)
  .then(() => {
    console.log('Connecté à la base de données avec succès!');
    
  })
  .catch(err => {
    console.error('Erreur lors de la connexion à la base de données:', err);
  });

// Définir le schéma de la personne
const personSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  âge: { type: Number },
  favoriteFoods: { type: [String] }
});

// Créer le modèle de personne
const Person = mongoose.model('Person', personSchema);

// Créer et enregistrer un enregistrement d'un modèle
const createPerson = (done) => {
  const personne = new Person({
    nom: 'Yaya Toure',
    âge: 25,
    favoriteFoods: ['Pizza', 'Burger']
  });

  personne.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Créer de nombreux enregistrements avec model.create()
const arrayOfPeople = [
  { nom: 'Patricia', âge: 28, favoriteFoods: ['Sushi', 'Pasta'] },
  { nom: 'Jean', âge: 32, favoriteFoods: ['Burger', 'Steak'] },
  { nom: 'Casemiro', âge: 35, favoriteFoods: ['Pizza', 'Ice Cream'] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Utiliser model.find() pour rechercher dans la base de données
const findPeopleByName = (personName, done) => {
  Person.find({ nom: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Utiliser model.findOne() pour renvoyer un seul document correspondant
const findOnePerson = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Utiliser model.findById() pour rechercher par _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Effectuer des mises à jour classiques en exécutant Rechercher, Modifier, puis Enregistrer
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'Hamburger';

  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);

    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

// Effectuer de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToUpdate = 20;

  Person.findOneAndUpdate(
    { nom: personName },
    { âge: ageToUpdate },
    { new: true },
    (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    }
  );
};

// Supprimer un document à l'aide de model.findByIdAndRemove()
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Supprimer plusieurs documents à l'aide de model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = 'Alice';

  Person.remove({ nom: nameToRemove }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Chaînage de méthodes pour effectuer une recherche complexe
const queryChain = (done) => {
  const foodToSearch = 'Pizza';

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ nom: 'asc' })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
};

// Exporter toutes les fonctions
module.exports = {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOnePerson,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain
};

