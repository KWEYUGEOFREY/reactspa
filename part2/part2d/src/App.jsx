import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons.jsx';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
      axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  


  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personsObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personsObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  // Filter persons based on search term (case insensitive)
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  const personsToShow = showAll ? persons : filteredPersons;

  return (
    <div>
      <h2>Phonebook</h2>
      
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'filtered' : 'all'}
        </button>
      
      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
