import {useState} from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [loc, setLoc] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=0d3fb853c2f4cd219c5d9f695ba40ffe`
  
  const search = (e) => {
    if(e.key === 'Enter')
    {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLoc('')
    }
  }

  return (
    <div className="app">
      <div className='search'>
        <input 
          type="text" 
          value={loc} 
          onChange={event => setLoc(event.target.value)}
          onKeyPress={search}
          placeholder='Enter Location'/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp-273.15)}°C</h1> : null}
          </div>
          <div className="description">
            <p>{data.weather[0].main}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{Math.round(data.main.feels_like-273.15)}°C</p> : null}
            <span>Feels Like</span>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <span>Humidity</span>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
