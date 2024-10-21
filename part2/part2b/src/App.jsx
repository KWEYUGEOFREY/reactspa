import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const addPerson = (event)=>{
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert('${newName} is already added to phonebook')
    } 
    else {
    const personsObject ={
      name: newName,
      number: newNumber
  
    }
    setPersons(persons.concat(personsObject))
    setNewName('')
    setNewNumber('')
   }

  }

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
      }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
      }
  
      const handleFilterChange = (event) => {
        setFilter(event.target.value);
      };
    
    // Filter persons based on search term (case insensitive)
    const personsToShow = persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with: <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add new contact</h2>
      <form onSubmit={addPerson}>
        
        
        <div>
          name: <input value={newName} onChange={handleNameChange}
          />
        </div>
        <div>
          number:<input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map((person, i) => 
          <li key ={i}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
