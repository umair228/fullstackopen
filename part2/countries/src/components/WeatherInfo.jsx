import React from "react";

const WeatherInfo = ({ capital, weather }) => {
    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
                style={{ width: '100px' }}
            />
        </div>
    );
};

export default WeatherInfo;