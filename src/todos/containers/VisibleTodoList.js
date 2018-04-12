import { connect } from 'react-redux';
import { actions, filters } from '../todos';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case filters.SHOW_ALL:
      return todos;
    case filters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case filters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
  }
};

export const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(actions.toggleTodo(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
