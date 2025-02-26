import { useEffect, useState } from 'react';
import './App.css'

import thermometer from './assets/hot.png';
import clouds_icon from './assets/clouds.png';
import clear_icon from './assets/sun.png';
import storm_icon from './assets/storm.png';
import rain_icon from './assets/rainy-day.png';
import wind_icon from './assets/wind.png';
import humidity_icon from './assets/humidity.png';
import haze_icon from './assets/fog.png';
import snow_icon from './assets/snowflake.png';

function App() {
  const [city, setCity] = useState("");
  const [weatherinfo,setWeatherinfo] = useState(false);

  const handleKeyDown = (event) =>{
    if(event.key === "Enter"){
      weather_info(city);
    }
  }
 

  const icon=(icon_id)=>{
    if(icon_id>=200 && icon_id<=232){
      return storm_icon;
    }
    else if(icon_id>=300 && icon_id<=321){
      return rain_icon;
    }
    else if(icon_id>=500 && icon_id<=531){
      return rain_icon;
    }
    else if(icon_id>=600 && icon_id<=622){
      return snow_icon;
    }
    else if(icon_id>=701 && icon_id<=781){
      return haze_icon;
    }
    else if(icon_id===800){
      return clear_icon;
    }
    else if(icon_id>=801 && icon_id<=804){
      return clouds_icon;
    }
  }

  const weather_info = async (input_city)=>{
    if(input_city === ""){
      alert("Field Empty! Enter a City name");
      return;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input_city}&units=metric&appid=${import.meta.env.VITE_APIKEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setWeatherinfo({
        country:data.sys.country,
        humidity:data.main.humidity,
        cityname:data.name,
        temperature:data.main.temp,
        windspeed:data.wind.speed,
        type:data.weather[0].description,
        icon_id:data.weather[0].id
      })

    }
    catch(error){
      alert("error while fetching");
    }
  }

  useEffect(()=>{weather_info("Noida");},[])

  return (
    <div className='container'>
      <div className="input_box">

        <input className ="text_box" type = "text" placeholder='Enter city name' onChange={(e)=>setCity(e.target.value)} onKeyDown={handleKeyDown}></input>
        <button className='search_btn' onClick={()=>weather_info(city)} >search</button>
      </div>

      <div className='city_name'>
        {weatherinfo.cityname}, {weatherinfo.country}
      </div>
      <div className='type'>
        {weatherinfo.type}
        <img src={icon(weatherinfo.icon_id)} alt='icon'></img>
      </div>
      <div className="temperature">
        {weatherinfo.temperature} °C 
        <img src = {thermometer} alt='thermometer'></img>
      </div>
      <div className="wind_and_humidity">
        <div className="wind">
          <img src={wind_icon} alt='wind'></img>
          Wind Speed 
          <span>{weatherinfo.windspeed} Km/hr </span>
        </div>
        <div className="humidity">
          <img src={humidity_icon} alt="humdity_icon" />
          Humidity 
          <span>{weatherinfo.humidity}% </span>
        </div>
      </div>
    </div>
      
  )
}

export default App
