const express = require('express');
const morgan = require("morgan");
const logger = require("./utils/logger");


const app = express();



// Middleware to parse JSON data
app.use(express.json());

// Middleware to log requests
// Create a custom token for logging request body
morgan.token("body", (req) => {
    return req.body ? JSON.stringify(req.body) : "No Body";
});

// Define the Morgan format with the custom token
const morganFormat = ":method :url :status :response-time ms - Body: :body";

// Use Morgan middleware with the custom format
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                    body: message.split("Body: ")[1],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

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

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
