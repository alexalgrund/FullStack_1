const express = require('express')
const morgan = require('morgan')

app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(morgan('combined'))

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendick",
      number: "39-23-6423122"
    }
  ]

  app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)
    response.json(person)
  })

  app.post('/api/persons', (request, response) => {
    const note = request.body
    const foundObject = persons.some(obj => obj.name === note.name)
    if (foundObject) {
        response.status(403).end()
        throw new Error('name must be unique')
    } else if (note.name === '' || note.number === '') {
        response.status(204).end()
        throw new Error('name or number is missing')
    } else {
      response.send('POST request received')    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  app.get('/api/info', (req, res) => {
    const requestTime =new Date()
    res.send(`Phonebook has info for ${persons.length} people <br> ${requestTime}`)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })