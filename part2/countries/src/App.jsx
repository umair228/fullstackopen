import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";
import WeatherInfo from "./components/WeatherInfo";


const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [weather, setWeather] = useState(null);


    //fetch countries data
    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {
            setCountries(response.data);
        });
    }, []);

    // Filter countries based on search input
    useEffect(() => {
        if (search === '') {
            setFilteredCountries([]);
            setSelectedCountry(null);
        } else {
            const results = countries.filter((country) =>
                country.name.common.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredCountries(results);
            if (results.length === 1) setSelectedCountry(results[0]);
        }
    }, [search, countries]);


    const handleShow = (country) => {
        setSelectedCountry(country);
    };


    useEffect(() => {
        if (selectedCountry) {
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
            const capital = selectedCountry.capital[0];
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

            axios.get(weatherUrl).then((response) => {
                setWeather(response.data);
            });
        }
    }, [selectedCountry]);



    return (
        <div>
            <h1>Country Finder</h1>
            <SearchBar search={search} setSearch={setSearch} />
            {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
            {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
                <CountryList countries={filteredCountries} handleShow={handleShow} />
            )}
            {selectedCountry && (
                <>
                    <CountryDetails country={selectedCountry} />
                    {weather && <WeatherInfo capital={selectedCountry.capital} weather={weather} />}
                </>
            )}
        </div>
    );
}

export default App;