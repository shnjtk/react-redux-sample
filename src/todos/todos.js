// State shape
// {
//   visibilityFilter: 'SHOW_ALL',
//   todos: [
//     {
//       text: 'Consider using Redux',
//       completed: true,
//     },
//     {
//       text: 'Keep all state in a single tree',
//       completed: false
//     }
//   ]
// }

// ==================================================
// Actions
// ==================================================
const SHOW_ALL       = 'SHOW_ALL';
const SHOW_ACTIVE    = 'SHOW_ACTIVE';
const SHOW_COMPLETED = 'SHOW_COMPLETED';

export const filters = {
  SHOW_ALL,
  SHOW_ACTIVE,
  SHOW_COMPLETED
};

// ** export following action constants for testing purpose only **
export const ADD_TODO              = 'react-redux-boilerplate/todos/ADD_TODO';
export const TOGGLE_TODO           = 'react-redux-boilerplate/todos/TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'react-redux-boilerplate/todos/SET_VISIBILITY_FILTER';

// ==================================================
// Reducer
// ==================================================
const reducers = {
  todos,
  visibilityFilter
};

export default reducers;

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        (todo.id === action.id)
        ? {...todo, completed: !todo.completed}
        : todo
      );
    default:
      return state;
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

// ==================================================
// Action Creators
// ==================================================
let nextTodoId = 0;

const addTodo = text => {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text
  };
};

const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    id
  };
};

const setVisibilityFilter = filter => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
};

export const actions = {
  addTodo,
  toggleTodo,
  setVisibilityFilter
};

