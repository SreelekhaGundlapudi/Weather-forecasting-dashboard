import React from 'react'
import './Home.css';
import Mainweathercard from './Mainweathercard';


const Home = () => {
  return (
    <div>
      <div className='card-component'>
        <div className='weather-section'>
           <h1>weather-forecasting</h1>
           
           <Mainweathercard></Mainweathercard>
           
           </div>
        </div>
      </div>
    
  )
}

export default Home
