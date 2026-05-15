import NoteItem from "./NoteItem";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [noteText, setNoteText] = useState("");

  const[notes,setNotes] = useState(() =>{
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];

  });

  const[searchText,setSearchText] = useState("");
  const[filter,setFilter] = useState("all");


  useEffect(() => {
    localStorage.setItem("notes",JSON.stringify(notes));
  },[notes]);

  

  function addNote(){

    if(noteText === ""){
      return;
    }

    setNotes([...notes, {

      text:noteText,
      completed:false,
      time:new Date().toLocaleTimeString()
    }

  ]);

    setNoteText("");
  }

  function deleteNote(indexToDelete){
    const updateNotes = notes.filter((note,index) => index !== indexToDelete);
    setNotes(updateNotes);

  }

  function editNote(indexToEdit){
    const newNote = prompt("Edit your note:",notes[indexToEdit].text);

    if(newNote === null || newNote.trim() === ""){
      return;
    }

    const updatedNotes = notes.map((note,index) => {
      if(index === indexToEdit){
        return {...note,text:newNote};
      }
      return note;
    });

    setNotes(updatedNotes);

  }

  function toggleCompleted(indexToToggle) {
    const updatedNotes = notes.map((note,index) => {
      if(index === indexToToggle){
        return{...note, completed: !note.completed };
      }
      return note;
    });
    setNotes(updatedNotes);
  }

  function clearAllNotes(){
    setNotes([]);
  }

  let filteredNotes = notes.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()));
  if(filter === "completed"){
    filteredNotes = filteredNotes.filter((note) => note.completed);
  } else if (filter === "pending"){
    filteredNotes = filteredNotes.filter((note) => !note.completed);
  }


  const completedNotes = notes.filter((note) => note.completed).length;

  const pendingNotes = notes.filter((note) => !note.completed).length;

  





  return(

    <div className="container">
      <h1>React Notes App</h1>

    <div className="stats">
      <p>Total: {notes.length}</p>
      <p>Completed: {completedNotes}</p>
      <p>Pending: {pendingNotes}</p>
    </div>

    <div className="filter-buttons">
      <button className={filter === "all" ? "active-filter" : ""} onClick={() => setFilter("all")}>All</button>
      <button className={filter === "completed" ? "active-filter" : ""} onClick={() => setFilter("completed")}>Completed</button>
      <button className={filter === "pending" ? "active-filter" : ""} onClick={() => setFilter("pending")}>Pending</button>
    </div>

    <button className="clear-btn" onClick={clearAllNotes} disabled={notes.length === 0}>Clear All</button>

      <input type="text" placeholder="Write a note..." value={noteText} 
      onChange={(e) => setNoteText(e.target.value)}/>

      

     <input type="text" placeholder="Search notes..." value={searchText} onChange={(e) => setSearchText(e.target.value)}/>

      <button  className ="add-btn" onClick={addNote}>Add Notes</button>

      {
        filteredNotes.length === 0 && <p className="empty-message">No Notes yet</p>
      }

      {

        filteredNotes.map((note,index) => (

          <NoteItem
          
          key = {index}
          note={note.text}
          completed={note.completed}
          time={note.time}
          onDelete={() => deleteNote(index)}
          onEdit={() => editNote(index)}
          onToggle = {() => toggleCompleted(index)}
          />
        
          

        ))
      }
      </div>
  );
}


export default App;