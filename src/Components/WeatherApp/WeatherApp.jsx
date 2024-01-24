import { useState } from 'react';
import './WeatherApp.css';


import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'



export const WeatherApp = () => {
    const apiKey = "your api key";

    // UPDATING THE WEATHER ICONS
    const [wicon, setWicon] = useState(cloud_icon)

    // MAKING THE SEARCH WORK USING API 
    const search = async () => {
        const element = document.getElementsByClassName('cityInput')
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent")
        const windSpeed = document.getElementsByClassName("wind-speed")
        const temp = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")

        // updating the html elements 
        humidity[0].innerHTML = Math.floor(data.main.humidity) + " %";
        windSpeed[0].innerHTML = Math.floor(data.wind.speed) + " Km/h";
        temp[0].innerHTML = Math.floor(data.main.temp) + " °C";
        location[0].innerHTML = data.name;
        console.log(data.weather[0].icon)
        
        if (data.weather[0].icon === "01d" || data.weather[0].icon == "01n") {
            
            setWicon(clear_icon);
        }
        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud_icon);
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle_icon);
        }
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon);
        }
        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon);
        }
        else {
            setWicon(clear_icon);
        }
    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className='cityInput' placeholder='Search' />
                <div className='search-icon' onClick={() => { search() }}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-imag">
                <img src={wicon} alt="" />
            </div>
            <div className='weather-temp'>24°C</div>
            <div className="weather-location">Tokyo</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-speed">18 Km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
