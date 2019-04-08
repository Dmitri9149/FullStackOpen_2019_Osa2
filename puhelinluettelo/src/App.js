import React, { useState } from 'react'
import Person from "./components/Person"

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number:"050"}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const arrayOfNames = persons.map(person => person.name)
    const isItNewName = arrayOfNames.indexOf(newName)
    if (isItNewName < 0) {
      const personObject = {
        name: newName,
        number:newNumber 
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber("")
    } else {
      window.alert(`${newName} on jo luettelossa`);
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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
      <form onSubmit = {addPerson}>
        <div>
          nimi: 
          <input
            value ={newName}
            onChange = {handleNameChange}
           />
        </div>
        <div>
          numero:
          <input
            value ={newNumber}
            onChange = {handleNumberChange}
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
