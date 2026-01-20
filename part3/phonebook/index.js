const express = require('express');
const morgan = require("morgan");
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express();

app.use(cors());
// Middleware to parse JSON data
app.use(express.json());

// Serve frontend production build (dist) from backend
const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath));

// 3.7-3.8*: request logging with morgan (incl. POST body)
morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// SPA fallback: serve React index.html for non-API GET routes (requires dist build to exist)
app.use((req, res, next) => {
    if (req.method !== 'GET') return next()
    if (req.path.startsWith('/api')) return next()
    if (req.path === '/info') return next()

    const indexPath = path.join(distPath, 'index.html')
    if (!fs.existsSync(indexPath)) {
        return res.status(404).send('Frontend build not found. Build frontend and copy dist/ into part3/phonebook.')
    }

    return res.sendFile(indexPath)
})

var persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

//Exercise 3.1
app.get('/api/persons', (req, res) => {
    res.json(persons);
})

//Exercise 3.2
app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`);
})

//Exercise 3.3
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);
    if(person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})

//Exercise 3.4
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
})

//Exercise 3.5

//generate random id function
const generateId = () => {
    return Math.floor(Math.random() * 1000).toString(); // Converts the ID to a string
};

app.post('/api/persons', (req, res) => {
    const body = req.body;

    // Validate input
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number is missing',
        });
    }

    // Check for duplicate name
    const existingPerson = persons.find(person => person.name === body.name);
    if (existingPerson) {
        return res.status(400).json({
            error: 'Name must be unique',
        });
    }

    // Create a new person object
    const person = {
        id: generateId(), // Ensure `generateId` is implemented
        name: body.name,
        number: body.number,
    };

    // Add to the persons array
    persons = persons.concat(person);


    // Respond with the newly added person
    res.status(201).json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
