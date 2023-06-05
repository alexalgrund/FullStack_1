import { useState, useEffect } from 'react'
import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState()
  const [newFilter, setNewFilter] = useState()
  const [newNumber, setNewNumber] = useState()
  const result = notes.map(note => note.name)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

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
      noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        setNewNumber('')
      })
      setErrorMessage(
        `${noteObject.name} was added to phonebook`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      event.preventDefault()
      alert(`${newNote} is already added to phonebook`)
    }
  
  }

  const Note = (props) => {
    return (
      <li>{props.name} {props.number}  <button onClick={()=> deletePerson(props.id, props.name)}>delete</button> </li>
      )
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const deletePerson = (id, name) => {
     if (window.confirm(`Delete ${name} ?`)) {
      noteService
    .deleteId(id)
    .then(() => {
      noteService
      .getAll()
      .then(returnedNotes => {
        setNotes(returnedNotes)
      })
    })
    setErrorMessage(
      `${name} was deleted from phonebook`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
      <Notification message={errorMessage} />
      {notes.filter(note => note.name.includes(document.getElementById("filterText").value)).map(note =>
       <Note key={note.id} name={note.name} number={note.number} id={note.id} toggleImportance={() => toggleImportanceOf(note.id)}/>
      )}
    </div>
  )
}

export default App 
