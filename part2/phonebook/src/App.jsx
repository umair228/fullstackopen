import { useState, useEffect } from 'react'
import personService from './services/person.js'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchInput, setSearchInput] = useState('');

    // Fetch initial data from server
    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            })
    }, []);


    // Filter persons using search input
    const showPersons = searchInput === ''
        ? persons
        : persons.filter((person) =>
            person.name.toLowerCase().includes(searchInput.toLowerCase())
        );

    const handleSubmit = (e) => {
        e.preventDefault();

        //if name already exists in persons, option to modify number and let user decide
        if (persons.find((person) => person.name === newName)) {
            const person = persons.find((person) => person.name === newName);
            const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

            if (confirmUpdate) {
                const id = person.id;
                const updatedPerson = { ...person, number: newNumber };

                personService
                    .update(id, updatedPerson)
                    .then((response) => {
                        setPersons(persons.map((person) => (person.id !== id ? person : response)));
                        setNewName('');
                        setNewNumber('');
                    })
            }
            return;


        }

        //new object for name and number (new)
        const newPerson = {
            name: newName,
            number: newNumber,
        }



        //add person & newNumber to persons
        personService
            .create(newPerson)
            .then((response) => {
                setPersons([...persons, response]);
                setNewName('');
                setNewNumber('');
            })


    }

    const handleDeletePerson = (id) => {
        const person = persons.find((person) => person.id === id);
        const confirmDelete = window.confirm(`Delete ${person.name}?`);

        if (confirmDelete) {
            personService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== id));
                })
            alert(`Deleted ${person.name} permanently!`);
        }
    };




    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchInput={searchInput} setSearchInput={setSearchInput} />
            <h2>Add a new</h2>
            <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit} />
            <h2>Numbers</h2>
            <Persons showPersons={showPersons} handleDeletePerson={handleDeletePerson}/>
        </div>
    )
}

export default App


