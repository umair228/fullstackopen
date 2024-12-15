import React from "react";

const SearchBar = ({ search, setSearch }) => {
    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a country..."
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '20px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
            />
        </div>
    );
};

export default SearchBar;