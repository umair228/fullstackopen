import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('');
    const [searchInput, setSearchInput] = useState('');



    // Filter persons using search input
    const showPersons = searchInput === ''
        ? persons
        : persons.filter((person) =>
            person.name.toLowerCase().includes(searchInput.toLowerCase())
        );

    const handleSubmit = (e) => {
        e.preventDefault();

        //if name already exists in persons, alert user and return
        if (persons.find((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            setNewName('')
            setNewNumber('')
            return
        }

        //add person & newNumber to persons
        setPersons([...persons, {name: newName, number: newNumber, id: persons.length + 1}]);
        //clear form
        setNewName('');
        setNewNumber('');


    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchInput={searchInput} setSearchInput={setSearchInput} />
            <h2>Add a new</h2>
            <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit} />
            <h2>Numbers</h2>
            <Persons showPersons={showPersons} />
        </div>
    )
}

export default App