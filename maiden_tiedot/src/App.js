import React from 'react';
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])


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
    setState(event.target.value)
  }

  render() {
    console.log('render')

    const countriesFilter =  this.state.countries.filter(country => country.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))
    const countriesToShow =
      this.state.filter === ""?
      this.state.countries:
      countriesFilter; 

    const filteringWarning  = countriesFilter.length > 10 ? 
      "too many matches, specify another filter":
      "";

    const whatToView = () => {  
      if (countriesFilter.length >1 && countriesFilter.length <= 10 ) {
        return (
          <div>
            <ul>
              {countriesToShow.map((country) => <li  key ={country.name}> {country.name}</li>)}
            </ul>
          </div>  
          )
        }
        
      if (countriesFilter.length === 1)  {
        return (
          <div>
            {countriesToShow.map((country) => <Country key ={country.name} country = {country}/>)}
          </div>  
        )
      }
    }  

    return (
      <div>
        <form >
          <Filter 
          heading ="find countries:" 
          value = {this.state.filter} 
          onChange ={this.handleCountryChangeRajaa}
          filteringWarning = {filteringWarning}
          />
        </form ><br/>
        <div>{whatToView()}</div>
      </div>  
    )
  } 
}




export default App