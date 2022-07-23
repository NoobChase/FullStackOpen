import { useEffect, useState } from "react";
import axios from 'axios'
function App() {
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountryData(response.data)
      })
  },[])
  const [countryData, setCountryData] = useState([])
  const [search, setSearch] = useState('')
  const [displayCountry, setDisplayCountry] = useState({})
  const [weather, setWeather] = useState({})


  const handleSearchChange = (event) =>{
    setSearch(event.target.value)
  }

  const Country = (props) => {
    if(Object.keys(displayCountry).length === 0){
      console.log('in if statement')
      return<p></p>
    }
    else{
      console.log('in else statement')
      console.log(displayCountry)
      var languages = []
      for(const property in displayCountry.languages){
        languages.push(displayCountry.languages[property])
      }
      return(
        <div>
          <h1>{displayCountry.name.common}</h1>
          <p>capital {displayCountry.capital}</p>
          <p>area {displayCountry.area}</p>

          <h3>languages:</h3>
          <ul>
          {languages.map(lang=>
            {
              return(<li>{lang}</li>)
            })}
          </ul>
          <img src={displayCountry.flags.png}/>
        </div>
      )
    }

    
  }
  const Countries = (props) => {
    var numMatches = 0
    var matches = []
    var selectedCountries = []

    countryData.forEach(country => {
      let countryName = country.name.common.toLowerCase()
      //console.log('this is the common name ', countryName)
      if(countryName.includes(search.toLowerCase())){
        numMatches +=1
        matches.push(countryName)
        selectedCountries.push(country)
      }
    });
    console.log('these are the matches ',matches,' and here is the numMatches ',numMatches)
    if(numMatches > 1 && numMatches<=10){
      return(
        <div>
          {selectedCountries.map(country=>
          {
            return(
              <div>
                <p>{country.name.common}</p><button onClick={() => setDisplayCountry(country)}>show</button>
              </div>
              )
          })}
        </div>
      )
    }
    else if(numMatches===1){
      setDisplayCountry(selectedCountries[0])
    }
}

const DisplayWeather = (props) => {
  if(Object.keys(displayCountry).length === 0){
    console.log('in if statement')
    return<p></p>
  }
  else{
    return <Weather/>
  }
}
const Weather = () =>{
  const api_key = process.env.REACT_APP_API_KEY

    var tempWeather = {}
    var temperature = 0
    var wind = 0
    console.log('in else statement')
    useEffect(() => {
    axios
        .get('https://api.openweathermap.org/data/2.5/weather?q='+displayCountry.capital[0]+'&appid='+api_key)
        .then(response => {
          console.log('promise fulfilled')
          tempWeather = response.data
          temperature = tempWeather.main.temp
          wind = tempWeather.wind.speed
          console.log(tempWeather)
          setWeather(tempWeather)
        })
      },[])
        if(Object.keys(weather).length === 0){
          console.log('in if statement')
          return<p></p>
        }
        else{
          return(
            <div>
              <h3>Weather in {displayCountry.capital[0]}</h3>
              <p>temperature {(weather.main.temp-273.15).toFixed(2)} Celsius</p>
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          )
        }
}
  return (
    <div>
      <div>
          find countries <input value = {search} onChange={handleSearchChange}/>
      </div>
      <Countries/>
      <Country/>
      
    </div>
  );
}

export default App;
