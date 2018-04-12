import React from 'react';
import { shallow } from 'enzyme';

import Todo from './Todo';

function setup({onClick=f=>f, completed=false, text='DO TEST'}) {
  const props = {
    onClick,
    completed,
    text
  };

  const enzymeWrapper = shallow(<Todo {...props}/>);

  return {
    props,
    enzymeWrapper
  };
}

describe('component', () => {
  describe('<Todo />', () => {
    it('should render <li> tag and text as a child', () => {
      const text = 'DO TEST';
      const { enzymeWrapper } = setup({text});

      expect(enzymeWrapper.find('li').text()).toBe(text);
    });

    it('should render <li> tag with \'line-through\' style if completed', () => {
      const text = 'DO TEST';
      const completed = true;
      const { enzymeWrapper } = setup({text, completed});

      const style = enzymeWrapper.find('li').props().style;
      expect(style).toHaveProperty('textDecoration', 'line-through');
    });
  });
});
