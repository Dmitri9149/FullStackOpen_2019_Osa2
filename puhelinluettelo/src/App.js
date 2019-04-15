import React, { useState, useEffect } from 'react'
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
      .getAll()
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
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber("")
      })    

    } else {
      window.alert(`${newName} on jo luettelossa`);
    }
  }

  const deletePerson = (id) => {
    return () => {
      const person = persons.find(person => person.id === id)
      if (window.confirm(`Poistetaanko   "${person.name}"  ?`)) {
        personService
        .del(id)
        .then(response => {
          console.log(response)
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons)
        })
      }
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
              key ={person.id}
              personsToShow = {personsToShow}
              onClick = {deletePerson(person.id)}
            />  
          </ul> 
    </div>
  )

}

export default App
