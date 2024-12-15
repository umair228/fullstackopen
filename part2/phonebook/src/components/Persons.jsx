const Persons = ({ showPersons, handleDeletePerson }) => {
    return (
        <div>
            {showPersons.map((person) => (
                <div key={person.id}>
                    <p>
                        {person.name} {person.number}
                    </p>
                    <button onClick={() => handleDeletePerson(person.id)}>delete</button>
                </div>
            ))}
        </div>
    );
}

export default Persons