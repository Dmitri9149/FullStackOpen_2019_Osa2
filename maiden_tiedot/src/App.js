import React,  { useState, useEffect } from 'react';
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() =>  {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleCountryChangeRajaa = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const countriesFilter = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const filteringWarning  = countriesFilter.length > 10  
    ?"too many matches, specify another filter"
    :"";

  const whatToView = () => {  
    if (countriesFilter.length >1 && countriesFilter.length <= 10 ) {
      return (
        <div>
          <ul>
            {countriesFilter.map((country) => <li  key ={country.name}> {country.name}</li>)}
          </ul>
        </div>  
      )
    } else if (countriesFilter.length === 1) {
      return (
        <div>
          {countriesFilter.map((country) => <Country key ={country.name} country = {country}/>)}
        </div>  
      )
    } else {
      return (
        null
      )
    }

  } 
    
  return (
    <div>
      <form >
        <Filter 
          heading ="find countries:" 
          value = {filter} 
          onChange ={handleCountryChangeRajaa}
          filteringWarning = {filteringWarning}
          />
      </form ><br/>
      <div>
        {whatToView()}
      </div>
    </div>  
  )    
} 

export default App