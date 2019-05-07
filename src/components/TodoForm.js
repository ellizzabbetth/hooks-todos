import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import TodosContext from '../context'; // provides dispatch


export default function TodoForm(){
  // call useState hook
  const [todo, setTodo] = useState("");
  // destructure to grab currentTodo
  const { state: { currentTodo = {} }, dispatch } = useContext(TodosContext);

  // has currentTodo in form object been updated?
  // if yes, display currentTodo in input

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text)
    } else {
      setTodo("");
    }
  },   // run useEffect only when the currentTodo changes.
  [currentTodo.id]
);

  const handleSubmit = async event => {
    event.preventDefault();
    if(currentTodo.text){
      const response = await axios.patch(`https://hooks-api.ellizzabbetth.now.sh/todos/${currentTodo.id}`, {
        text: todo
      })
      dispatch({type: "UPDATE_TODO", payload: response.data});
    } else {
      const response = await axios.post('https://hooks-api.ellizzabbetth.now.sh/todos', {
        id: uuidv4(),
        text: todo,
        complete: false
      });
      // dispatch function sends data in todo to reducer
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
        />
    </form>
  );
}
