import React, { useState } from 'react'
import Person from "./components/Person"
import Filter from './components/Filter';
import PersonForm from "./components/PersonForm";

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number:"050", newFilter:""}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState("")

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

  const handlePersonFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow =  newFilter === ""
  ? persons
  : persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()));
  

  const rows = () => personsToShow.map(person =>
    <Person
      key = {person.name}
      person={person}
    />
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter
        heading = " rajaa näytettäviä:"
        value = {newFilter}
        onChange = {handlePersonFilter} 
      /><br/>
      <h3>lisää uusi</h3>       
      <form onSubmit = {addPerson}>
        <div>
          nimi: 
          <input
            value ={newName}
            onChange = {handleNameChange}
           />
        </div><br/>
        <div>
          numero:
          <input
            value ={newNumber}
            onChange = {handleNumberChange}
          />
        </div><br/>
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
