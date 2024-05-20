import React, {  useState } from 'react'
import './Mainweathercard.css';
import axios from 'axios';



const Mainweathercard = () => {
   
  const [data,setData] = useState({
    celcius: 0,
    name:"City",
    humidity: 0,
    wind:0,
    pressure:0,
    maxtemp: 0,
    mintemp: 0,
    image: '/Images/cloud-sun.png'
  })
   const [name,setName] = useState("")
  const[err,setErr] = useState("")

  const handleclick = () => {
      if (name !== "") {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e9e3e53ef6e94c710de0c6d06a5306aa`
    axios.get(API_URL)
    .then(res => {
      let imagePath = '';
      if(res.data.weather[0].main == "Clouds"){
        imagePath = "/Images/cloud.png"
      }else if (res.data.weather[0].main == "Clear"){
        imagePath = "/Images/sun icon.png"
      }else if (res.data.weather[0].main == "Rain"){
        imagePath = "/Images/cloud-rain.png"
      }else if(res.data.weather[0].main == "Drizzle"){
        imagePath = "/Images/cold.png"
      }else if(res.data.weather[0].main == "Mist"){
        imagePath = "/Images/cloud-sun.png"
      } else {
        imagePath = "/Images/cloud-sun.png"
      }
      setData({...data, celcius: res.data.main.temp-273.15, name: res.data.name, humidity: res.data.main.humidity, wind: res.data.wind.speed, pressure: res.data.main.pressure, maxtemp: res.data.main.temp_max-273, mintemp: res.data.main.temp_min-273, image: imagePath})
      setErr("")
    })
    .catch(err => {
      
      if(err.response.status == 404 ){
        setErr("Invalid city name");
      }
      console.log(err)}
      )}
  }
  
  return (
    <div className='container'>
      <div className='content-card1'>
         <div className='search'>
          <input type='text' placeholder='Enter city name' onChange={e => setName(e.target.value)} />
          <button><img src='/Images/search.png' onClick={handleclick}/></button>
         </div>
         <div className='error'>
            <p>{err}</p>
         </div>
         <div className='image'>
          <img src={data.image} alt=''/>
         </div>
         <div className='content'>
         <h2>{data.name}</h2>
         <h4>{data.celcius.toFixed(2)}°c</h4>
         </div>
         </div>

      <div className='content-card2'>
        <div className='icon-card'>
            <img src='/Images/humidity.png'/>
            <p>Humidity : {data.humidity}%</p>
            
        </div>
        <div className='icon-card'>
            <img src='/Images/wind.png'/>
            <p>wind : {data.wind}kmph</p>
            
        </div>
        <div className='icon-card'>
            <img src='/Images/pressure.png'/>
            <p>Pressure : {data.pressure}atm</p>
            
        </div>
        <div className='icon-card'>
            <img src='/Images/high-temp.png'/>
            <p>Max-Temperature : {data.maxtemp.toFixed(2)}°c</p>
            
        </div>
        <div className='icon-card'>
            <img src='/Images/low-temp.png'/>
            <p>Min-Temperature : {data.mintemp.toFixed(2)}°c</p>
            
        </div>

      </div>
    
    </div>
  )
}

export default Mainweathercard
