import React from 'react'
import Person from "./Person"

const Persons = ({personsToShow, onClick}) => personsToShow.map(person =>
  <Person
    key = {person.id}
    person={person}
    onClick = {onClick(person.id)}
  />
)



export default Persons