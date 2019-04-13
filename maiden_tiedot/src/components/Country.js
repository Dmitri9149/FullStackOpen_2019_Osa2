import React from 'react'
import   { useState, useEffect } from 'react';
import axios from 'axios'


const Country = ({ country }) => {

  const [weatherCurrentCondition, setWeatherCurrentCondition] = useState([])
  const [weatherCurrent, setWeatherCurrent] = useState([])
  const [thisCountry] = useState(country)

  
  useEffect(() =>  {
    console.log('effect in Country')

    
    var url = new URL("http://api.apixu.com/v1/current.json?key=5e57b26da73b490a87771809191104&q=Paris");
    url.searchParams.set('q', thisCountry.capital);
    console.log("the url = ", url)
    
    axios
      .get(url)
      .then(response => {
        console.log('promise fulfilled')
        console.log ("response", response.data)
        setWeatherCurrentCondition(response.data.current.condition)
        setWeatherCurrent(response.data.current)
      })

  }, [])
  return (
    <div>
      <h2>{country.name} {country.altSpellings[1]}</h2>
      <p>capital:&nbsp;  {country.capital}</p>
      <p>population:&nbsp;  {country.population}</p>
      <ul>
       {country.languages.map(lang =><li key = {lang.name}> {lang.name}</li>)} 
      </ul>
      <img max-width = {250} height = {80} src={country.flag} alt="flag" />
      <div>
      <h2>Weather in {thisCountry.capital}</h2>
          <p>
            <b>
              temperature :&nbsp; 
            </b> 
            {weatherCurrent.temp_c} Celsius
          </p>
          <img max-width = {40} height = {40} src = {weatherCurrentCondition.icon} alt="Weather" />
          <p>
            <b>
              wind :&nbsp; 
            </b>   
            {weatherCurrent.wind_kph} kph direction {weatherCurrent.wind_dir} 
          </p>
 
      </div>
      
      
    </div>
  )
}

export default Country