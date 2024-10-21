import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('sample contact name')

  const addName = (event)=>{
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert('${newName} is already added to phonebook')
    } 
    else {
    const personsObject ={
      name: newName
  
    }
    setPersons(persons.concat(personsObject))
    setNewName('')
   }

  }

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
    

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        
        
        <div>
          name: <input value={newName} onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map((person, i) => 
          <li key ={i}>
            {person.name}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
