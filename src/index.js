import React, { useContext, useReducer, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import TodosContext from './context';
import todosReducer from './reducer';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import axios from 'axios';


// each hook manages it's own state
const useAPI = endpoint => {
  // set initial state to empty array
  const [data, setData] = useState([]);
  // call getData when App component gets mounted
  useEffect(() => {
      getData();
  }, []);
  // to make the requests for todos.
  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  }
  // return todos that's being set in setData
  return data;
}

const App =() => {
   const initialState = useContext(TodosContext);
   const [state, dispatch] = useReducer(todosReducer, initialState);
   // custom hook
   const savedTodos =  useAPI("https://hooks-api.ellizzabbetth.now.sh/todos");
   // put saved todos in state using redux
   useEffect(() => {
     // dispatch new action
     dispatch({
       type: "GET_TODOS",
       payload: savedTodos
     }) // dispatch action when savedTodos changes
   }, [savedTodos]);

   return (
     <TodosContext.Provider value={{state, dispatch}}>
      <TodoForm />
      <TodoList />
     </TodosContext.Provider>
   )
}

ReactDOM.render(

    <App />
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
