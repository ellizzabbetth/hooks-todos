import uuidv4 from 'uuid/v4';

export default function reducer(state, action){
  switch(action.type){
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload
      };
    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map(t =>
        t.id === action.payload.id  ?
        action.payload
        //  { ...action.payload, complete: !action.payload.complete}
         : t);
         return {
           ...state,
           todos: toggledTodos
         };
    case "UPDATE_TODO":
        // if(!action.payload){
        //   return state;
        // }
        // if(state.todos.findIndex( t => t.text === action.payload) > -1) {
        //   return state;
        // }
       const updatedTodo = {...action.payload };
       const updatedTodoIndex = state.todos.findIndex(
         t => t.id === state.currentTodo.id
       );
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
          updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1)
      ]
      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };
    case "REMOVE_TODO":
      const filteredTodos = state.todos.filter( t => t.id !== action.payload.id)
      const isRemovedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: filteredTodos
      };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };  // update currentTodo value with action.payload
    case "ADD_TODO":
       // if(!action.payload){
       //   return state;
       // }
       // if(state.todos.findIndex( t => t.text === action.payload) > -1) {
       //   return state;
       // }
      // set unique id,
      // const newTodo = {
      //   id: uuidv4(),
      //   text: action.payload,
      //   complete: false
      // };
      // add new todo object to array of previously created todos
      // add it onto end of array using spread  operator
      const addedTodos = [...state.todos, action.payload]
      // return object with updated todos array of addedTodos
      return {
        ...state,
        todos: addedTodos
      };
    default:
      return state;
  }
}
