import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState()
  const [newFilter, setNewFilter] = useState()
  const [newNumber, setNewNumber] = useState()

  const result = notes.map(note => note.name)

  const addNote = (event) => {
    if (result.includes(newNote) === false) {
      event.preventDefault()
      const noteObject = {name: newNote, number: newNumber}
      setNotes(notes.concat(noteObject))
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
      {notes.filter(note => note.name.includes(document.getElementById("filterText").value)).map(note =>
       <Note key={note.id} name={note.name} number={note.number} />
      )}
    </div>
  )
}

export default App 