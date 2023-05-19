import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'

const App = (props) => {
  const [persons, setNotes] = useState([])
  const [newNote, setNewNote] = useState()
  const [newFilter, setNewFilter] = useState()
  const [newNumber, setNewNumber] = useState()
  const result = persons.map(note => note.name)

  useEffect(() => {
    noteService
  .getAll()
  .then(initialNotes => {
    setNotes(initialNotes)
  })
  }, [])

  const addNote = (event) => {
    const noteObject = {name: newNote, number: newNumber}
    if (result.includes(newNote) === false) {
      event.preventDefault()
    } else {
      event.preventDefault()
      alert(`${newNote} is already added to phonebook, replace the old number
      with a new one?`)
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(persons.concat(returnedNote))
        setNewNote('')
        setNewNumber('')
      })
  }

  const Note = (props) => {
    return (
      <p>{props.name} {props.number}  <button onClick={()=> deletePerson(props.id, props.name)}>delete</button> </p>
      )
  }

  const deletePerson = (id, name) => {
     if (window.confirm(`Delete ${name} ?`)) {
      noteService
    .deleteId(id)
    .then(() => {
      noteService
      .getAll()
      .then(returnedPersons => {
        setNotes(returnedPersons)
      })
    })
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
       <Note key={note.id} name={note.name} number={note.number} id={note.id}/>
      )}
    </div>
  )
}

export default App 