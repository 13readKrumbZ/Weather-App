"use client";
import React, { useState } from "react";
import axios from "axios";

import "./WeatherApp.css";
//use usestate to store coodinates in object
//fetch coordinates from api
//add coodinates to weather url
//create usestate to store weather data

export default function Home() {
  const [coordinates, setCoordinates] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");

  const api_key = "b3fdead6674f3724e0d85306c25c1d1b";
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${location},gy&units=metric&appid=${api_key}`;

  function getWeatherData(Event) {
    if (Event.key === "Enter") {
      axios.get(weather_url).then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      });

      setLocation("");
    }
  }

  return (
    <div className="app">
      <div className="card">
        <input
          type="text"
          className="input"
          placeholder="Enter City"
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={getWeatherData}
          value={location}
        ></input>
      </div>
      <div className="temperatur">
        {weatherData.main ? <h1>{weatherData.main.temp}°C</h1> : null}
      </div>
      <div className="city">{weatherData.name}</div>
      <div className="description">
        {weatherData.weather ? <h1>{weatherData.weather[0].main}</h1> : null}
      </div>
      <div className="bottom">
        <div className="visibility">
          {weatherData.visibility ? (
            <div>vis {weatherData.visibility}</div>
          ) : null}
        </div>
        <div className="humidity">
          {weatherData.main ? <h1>Hmd{weatherData.main.humidity}</h1> : null}
        </div>
        <div className="wind_speed">
          {weatherData.wind ? (
            <div>WndSpd {weatherData.wind.speed} km/h</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
