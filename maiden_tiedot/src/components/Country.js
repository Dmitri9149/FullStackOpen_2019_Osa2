import React from 'react'

const Country = ({ country }) => {
  return (
    <li>
      <h2>{country.name} {country.altSpellings[1]}</h2>
      <p>capital: {country.capital}</p>
      <p>population:{country.population}</p>
      <img max-width = {250} height = {80} src={country.flag} alt="Flag" />
      
    </li>
  )
}

export default Country