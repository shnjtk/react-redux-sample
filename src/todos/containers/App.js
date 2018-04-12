import React from 'react';
import Footer from '../components/Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

const App = () => (
  <div>
    <h2>Todo App</h2>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
