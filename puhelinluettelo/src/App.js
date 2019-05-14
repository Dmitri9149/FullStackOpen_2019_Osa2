import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({ message, messageClass }) => {
  if (message === '') {
    return null
  }
  return (
    <div className = {messageClass}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState("")
  const [notify, setNotify] = useState({message:"", messageClass:"nothing"})

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(data => {
        console.log('promise fulfilled')
        setPersons(data)

      })
  }, [])

  console.log('render', persons.length, 'persons') 

  const addPerson = (event) => {
    event.preventDefault()
    const arrayOfNames = persons.map(person => person.name)
    const isItNewName = arrayOfNames.indexOf(newName)
    const personObject = {
      name: newName,
      number:newNumber 
    }

    if (isItNewName < 0) {
      console.log(isItNewName)
      personService
        .create(personObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNotify(
            {message:`Lisatiin "${newName}" `, messageClass:"added"
            })
          setTimeout(() => {
            setNotify({message:"", messageClass:"nothing"})
          }, 1000)                   
          setNewName('')
          setNewNumber("")
        })
        .catch(error => {
          console.log("error (new name) =", error)
          console.log("error.response.data (new name) =", error.response.data)
          console.log("error.response (new name) =", error.response)
          console.log("error.name (new name) =", error.name)
          setNotify(
            {message:error.response.data.error, messageClass:"error"
          })  
        })
    } else { 
        const indexOfName = persons[isItNewName].id
        console.log(indexOfName)
        numberUpdate(indexOfName, personObject)
    }
  }

  const deletePerson = (id) => {
    return () => {
      const person = persons.find(person => person.id === id)
      if (window.confirm(`Poistetaanko   "${person.name}"  ?`)) {
        personService
        .del(id)
        .then(data => {
          console.log(data)
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons)

          setNotify(
            {message:`"${person.name}" on poistettu`, messageClass:"eliminated"
            })
          setTimeout(() => {
            setNotify({message:"", messageClass:"nothing"})
          }, 1000)                   
        })

      }
    }
  }

  const numberUpdate = (id, personObject) => {
    if (window.confirm(`"${personObject.name}"   on jo luettelossa, korvaatanko vanha numero uudella ?`)){
      personService
        .update(id, personObject)
        .then(data => {
          console.log(data, "in numberUpdate")
          
          setPersons(persons.map(person => person.id !== id ? person : data))

          setNotify(
            {message:`"${newName}" phone numero muutetaan`, messageClass:"changed"
            })
          setTimeout(() => {
            setNotify({message:"", messageClass:"nothing"})
          }, 1000)                   
          setNewName("")
          setNewNumber("")
        })
        .catch(error=> 
          { 
            if(!error.response.data.toString().get("error")) {
              console.log("error  = " , error )
              console.log("error.response.data= ", error.response.data)
              console.log("error.response = ", error.response)
              console.log("error.response = ", error.response.data.toString())
              

              const newPersons = persons.filter(person => person.id !== id)
              setPersons(newPersons)
              setNotify(
                {message:`Henkilön "${newName}" oli jo poistettu`, messageClass:"error"
              })
              setTimeout(() => {
                setNotify({message:"", messageClass:"nothing"})
              }, 1000)  
              setNewName('')
              setNewNumber("")
            } else {
              setNotify(
                {message:error.response.data.error, messageClass:"error"
              })
            }
                           
        })
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
        <Notification 
          message = {notify.message}
          messageClass = {notify.messageClass}
        />

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
          <table>
            <tbody>
            <Persons 
              personsToShow = {personsToShow}
              onClick={deletePerson}
            />  
            </tbody>
          </table>
    </div>
  )

}

export default App
