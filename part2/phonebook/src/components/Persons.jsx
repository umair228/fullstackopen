const Persons = ({ showPersons }) => {
    return (
        <div>
            {showPersons.map((person) => (
                <p key={person.id}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    )
}

export default Persons