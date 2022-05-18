import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=acf477adbb1c13b666a7aeca8b7466c6`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

          
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>

            <div className="max">
              {data.main ? <p className='bold'>{data.main.temp_max.toFixed()}°C</p> : null}
              <p>Max Temp</p>
            </div>

            <div className="min">
              {data.main ? <p className='bold'>{data.main.temp_min.toFixed()}°C</p> : null}
              <p>Min Temp</p>
            </div>

            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
        

            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KPH</p> : null}
              <p>Wind Speed</p>
            </div>


            <div className="clouds">
              {data.clouds ? <p className='bold'>{data.clouds.all.toFixed()} %</p> : null}
              <p>Cloudiness</p>
            </div>

    
          </div>
        }



      </div>
    </div>
  );
}

export default App;
