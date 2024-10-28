import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons.jsx';
import Footer from './components/Footer.jsx';
import Notification from './components/Notification.jsx';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        showNotification('Failed to retrieve contacts.', 'error');
      });
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000); // Notification is visible for 5 seconds
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook, replace the old number with the new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${newName}'s number.`, 'success');
          })
          .catch(error => {
            showNotification(`Failed to update ${newName}.`, 'error');
            setPersons(persons.filter(person => person.id !== existingPerson.id));
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${newName}.`, 'success');
        })
        .catch(error => {
          showNotification(`Failed to add ${newName}.`, 'error');
        });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification(`Deleted ${name}.`, 'success');
        })
        .catch(error => {
          showNotification(`Failed to delete ${name} because the name has been removed from server.`, 'error');
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  const personsToShow = showAll ? persons : filteredPersons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} type={notificationType} />
      
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

      <Persons personsToShow={personsToShow} onDelete={handleDelete} />
      <Footer/>
    </div>
  );
};

export default App;
