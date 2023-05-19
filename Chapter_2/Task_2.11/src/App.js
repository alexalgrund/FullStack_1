import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
  const [persons, setNotes] = useState([])
  const [newNote, setNewNote] = useState()
  const [newFilter, setNewFilter] = useState()
  const [newNumber, setNewNumber] = useState()
  const result = persons.map(note => note.name)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])

  const addNote = (event) => {
    if (result.includes(newNote) === false) {
      event.preventDefault()
      const noteObject = {name: newNote, number: newNumber}
      setNotes(persons.concat(noteObject))
      setNewNote('')
      setNewNumber('')
    } else {
      event.preventDefault()
      alert(`${newNote} is already added to phonebook`)
    }
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <label for="fname">filter shown with</label>
      <input id="filterText"
      onChange={handleFilterChange}/>
      <h1>Add a new</h1>
      <form onSubmit={addNote}>
      <label for="fname">Name:</label>
      <input value={newNote}
      onChange={handleNoteChange}/>
      <p></p>
      <label for="fname">Number:</label>
      <input value={newNumber}
      onChange={handleNumberChange}/>
<p></p>
        <button type="submit">add</button>
      </form>
      <h1>Numbers</h1>
      {persons.filter(note => note.name.includes(document.getElementById("filterText").value)).map(note =>
       <Note key={note.id} name={note.name} number={note.number} />
      )}
    </div>
  )
}

export default App 