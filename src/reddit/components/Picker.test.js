import React from 'react';
import { shallow } from 'enzyme';

import Picker from './Picker';

function setup(value, onChange = f=>f, options = []) {
  const props = {
    value,
    onChange,
    options
  };

  const enzymeWrapper = shallow(<Picker {...props}/>);

  return {
    props,
    enzymeWrapper
  };
}

describe('components', () => {
  describe('<Picker />', () => {
    it('should render <h1> with passed value', () => {
      const value = 'DO TEST';
      const { enzymeWrapper } = setup(value);

      expect(enzymeWrapper.find('h1').text()).toBe(value);
    });

    it('should render <option> with passed options', () => {
      const value = 'DO TEST';
      const options = ['reactjs', 'frontend'];
      const { enzymeWrapper } = setup(value, undefined, options);

      expect(enzymeWrapper.find('option').length).toBe(options.length);
    });

    it('should call onChange when <select> value is changed', () => {
      const value = 'DO TEST';
      const options = ['reactjs', 'frontend'];
      const testMock = jest.fn();
      const { enzymeWrapper } = setup(value, testMock, options);

      enzymeWrapper.find('select').simulate('change', {target: {value: options[0]}});
      expect(testMock).toBeCalled();
    });
  });
});
