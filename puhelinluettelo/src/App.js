import React, { useState } from 'react'
import Person from "./components/Person"

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
  
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const rows = () => persons.map(person =>
    <Person
      key = {person.name}
      person={person}
    />
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit = {addName}>
        <div>
          nimi: 
          <input
            value ={newName}
            onChange = {handleNameChange}
           />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
        <ul>
          {rows()}
        </ul>
    </div>
  )

}

export default App
