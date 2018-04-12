import React from 'react'
import { shallow } from 'enzyme';

import TodoList from './TodoList';

function setup({todos=[], onTodoClick=f=>f}) {
  const props = {
    todos,
    onTodoClick
  };

  const enzymeWrapper = shallow(<TodoList {...props}/>);

  return {
    props,
    enzymeWrapper
  };
}

describe('component', () => {
  describe('<TodoList />', () => {
    it('should render todos as children', () => {
      const todo = {id: 0, completed: false, text: 'DO TEST'};
      const todos = [todo];
      const { enzymeWrapper } = setup({todos});

      expect(enzymeWrapper.find('ul').children().length).toBe(todos.length);
    });

    it('should call onTodoClick when a child is clicked', () => {
      const todo = {id: 0, completed: false, text: 'DO TEST'};
      const todos = [todo];
      const onTodoClick = jest.fn();
      const { enzymeWrapper } = setup({todos, onTodoClick});

      enzymeWrapper.find('ul').childAt(0).simulate('click');
      expect(onTodoClick).toBeCalled();
    });
  });
});
