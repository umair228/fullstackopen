const Filter = ({ searchInput, setSearchInput }) => {
    return (
        <div>
            filter shown with <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        </div>
    )
}

export default Filter