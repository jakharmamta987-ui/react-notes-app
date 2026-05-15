function NoteItem(props) {
    return (
        <div className="note-item">
             <p className = {props.completed ? "completed" : ""}>{props.note}</p>
             <small>{props.time}</small>

             <button onClick={props.onDelete}>Delete</button>
             <button onClick={props.onEdit}>Edit</button>
             <button onClick={props.onToggle}>{props.completed ? "Undo" : "Complete"}</button>
        </div>
    );
          
}

export default NoteItem;