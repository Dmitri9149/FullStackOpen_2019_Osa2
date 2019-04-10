import React from 'react'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name} {country.altSpellings[1]}</h2>
      <p>capital: {country.capital}</p>
      <p>population:{country.population}</p>
      <ul>
       {country.languages.map(lang =><li key = {lang.name}> {lang.name}</li>)} 
      </ul>
      <img max-width = {250} height = {80} src={country.flag} alt="Flag" />
      
    </div>
  )
}

export default Country