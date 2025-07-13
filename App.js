import React, { useState } from "react";
import "./App.css";
 
 
function App() {
  const [toDos, setToDos] = useState([]);
  const [deletedToDos, setDeletedToDos] = useState([]); // State for deleted todos
  const [toDo, setToDo] = useState("");
 
  // Handle delete functionality (Move to deleted list)
  const deleteToDo = (id) => {
    const itemToDelete = toDos.find((obj) => obj.id === id);
    if (itemToDelete) {
      setDeletedToDos([...deletedToDos, itemToDelete]); // Store deleted items
      setToDos(toDos.filter((obj) => obj.id !== id)); // Remove from active list
    }
  };
 
  // Restore deleted item
  const restoreToDo = (id) => {
    const itemToRestore = deletedToDos.find((obj) => obj.id === id);
    if (itemToRestore) {
      setToDos([...toDos, itemToRestore]); // Add back to active list
      setDeletedToDos(deletedToDos.filter((obj) => obj.id !== id)); // Remove from deleted list
    }
  };
 
  // Handle adding a new to-do
  const addToDo = () => {
    if (toDo.trim()) {
      const newToDo = {
        id: Date.now(),
        text: toDo.trim(),
        status: false,
        dateTime: new Date().toLocaleString(),
      };
      console.log("Adding To-Do:", newToDo);
      setToDos([...toDos, newToDo]);
      setToDo(""); // Clear input
    }
  };
 
  return (
    <div className="Todo-app">
      <h1 className="TopHeading">ToDo List App</h1>
      <div className="app">
        <div className="mainHeading Main-block">
          <h2>whoop! Create your list 😀🖊</h2>
          <div className="input">
            <input
              value={toDo}
              onChange={(e) => {
                console.log("Current Input:", e.target.value);
                setToDo(e.target.value)}}
              type="text"
              placeholder="🖊️ Add item..."/>
            <i onClick={addToDo} className="fas fa-plus"></i>
          </div>
          <div className="logo-block">
            <img src="/todo.png" alt="Logo" />
          </div>
        </div>
 
        {/* Active Todos List */}
        <div className="todos Main-block" style={{ display: toDos.length > 0 ? "block" : "none" }}>
          <h2>Added list items 📃</h2>
          {toDos.map((obj) => (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  type="checkbox"
                  checked={obj.status}
                  onChange={(e) => {
                    console.log(
                      `Updating status for To-Do ID: ${obj.id}, Checked: ${e.target.checked}`
                    );
                    setToDos(
                    toDos.map((item) =>
                      item.id === obj.id ? { ...item, status: e.target.checked } : item
                    )
                  )}}
                />
                <p>{obj.text}</p>
                <small className="text-gray">Added on: {obj.dateTime}</small>
              </div>
              <div className="right">
                <i className="fas fa-times" onClick={() => deleteToDo(obj.id)}></i>
              </div>
            </div>
          ))}
        </div>
 
        {/* Completed Todos List */}
        <div className="Main-block" style={{ display: toDos.some((obj) => obj.status) ? "block" : "none" }}>
          <h2>Completed list items 📌</h2>
          {toDos.filter((obj) => obj.status).map((obj) => (
            <div className="Added-list" key={obj.id}>
              <p className="todo">{obj.text}</p>
              <small className="text-gray">Completed on: {obj.dateTime}</small>
            </div>
          ))}
        </div>
 
        {/* Deleted Todos List */}
        <div className="Main-block" style={{ display: deletedToDos.length > 0 ? "block" : "none" }}>
          <h2>Deleted list items ❌</h2>
          {deletedToDos.map((obj) => (
            <div className="Deleted-list" key={obj.id}>
              <p className="todo">{obj.text}</p>
              <small className="text-gray">Deleted on: {new Date().toLocaleString()}</small>
              <button onClick={() => restoreToDo(obj.id)}>🔄</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
export default App;
