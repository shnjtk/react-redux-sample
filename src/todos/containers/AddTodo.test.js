import React from 'react';
import { mount } from 'enzyme';

import { AddTodo } from './AddTodo';

const setup = (dispatch = f=>f, text = undefined) => {
  const props = {
    dispatch,
    text
  };

  const enzymeWrapper = mount(<AddTodo {...props}/>);

  return {
    props,
    enzymeWrapper
  };
};

describe('containers', () => {
  describe('<AddTodo />', () => {
    it('should render <form> with <button>', () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper.find('form').length).toBe(1);
      expect(enzymeWrapper.find('button').length).toBe(1);
    });

    it('should call dispatch when the subumit button is clicked', () => {
      const inputText = 'DO TEST';
      const testMock = jest.fn();
      const fakeEvent = { preventDefault: () => {} };
      const { enzymeWrapper } = setup(testMock, inputText);

      enzymeWrapper.find('form').simulate('submit', fakeEvent);
      expect(testMock).toBeCalled();
    });

    it('should not call dispatch when the submit button is cliecked with no input', () => {
      const testMock = jest.fn();
      const fakeEvent = { preventDefault: () => {} };
      const { enzymeWrapper } = setup(testMock);

      enzymeWrapper.find('form').simulate('submit', fakeEvent);
      expect(testMock).not.toBeCalled();
    });
  });
});
