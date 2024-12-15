const Persons = ({ showPersons, handleDeletePerson }) => {
    return (
        <div>
            {showPersons.map((person) => (
                    <p key={person.id}>
                        {person.name} {person.number}{' '}
                        <button onClick={() => handleDeletePerson(person.id)}>delete</button>
                    </p>
            ))}
        </div>
    );
}

export default Persons