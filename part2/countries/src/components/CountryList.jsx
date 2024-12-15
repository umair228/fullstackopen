import React from "react";

const CountryList = ({ countries, handleShow }) => {
    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {countries.map((country) => (
                <li key={country.cca3} style={{ marginBottom: '10px' }}>
                    {country.name.common}{" "}
                    <button onClick={() => handleShow(country)} style={{
                        padding: '5px 10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}>
                        Show
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default CountryList;