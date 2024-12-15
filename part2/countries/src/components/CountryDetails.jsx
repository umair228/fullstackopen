import React from "react";

const CountryDetails = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} km²</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(country.languages).map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                style={{ width: '200px', marginTop: '10px' }}
            />
        </div>
    );
};

export default CountryDetails;