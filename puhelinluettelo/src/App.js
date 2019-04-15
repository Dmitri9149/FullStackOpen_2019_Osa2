import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    console.log('effect')
    personService
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons') 
  


  const addPerson = (event) => {
    event.preventDefault()
    const arrayOfNames = persons.map(person => person.name)
    const isItNewName = arrayOfNames.indexOf(newName)
    if (isItNewName < 0) {
      const personObject = {
        name: newName,
        number:newNumber 
      }

      personService
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber("")
      })    

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


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter
        heading = " rajaa näytettäviä:"
        value = {newFilter}
        onChange = {handlePersonFilter} 
      /><br/>
      <h3>lisää uusi</h3>   
      <PersonForm
        addPerson = {addPerson}
        newName = {newName}
        handleNameChange = {handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}        
      />    
      <h2>Numerot</h2>
          <ul>
            <Persons 
              personsToShow = {personsToShow}
            />  
          </ul> 
    </div>
  )

}

export default App
