import React from 'react';
import { mount } from 'enzyme';

import Link from './Link';

function setup(active = false, children = 'DO TEST', onClick = f=>f) {
  const props = {
    active,
    children,
    onClick
  };

  const enzymeWrapper = mount(<Link {...props}/>);

  return {
    props,
    enzymeWrapper
  };
}

describe('component', () => {
  describe('<Link />', () => {
    describe('active', () => {
      it('should render <span> tag and text as a child', () => {
        const text = 'DO TEST';
        const { enzymeWrapper } = setup(true, text);

        expect(enzymeWrapper.find('span').text()).toBe(text);
      });
    });

    describe('inactive', () => {
      it('should render <a> tag and text as a child', () => {
        const text = 'DO TEST';
        const { enzymeWrapper } = setup(false, text);

        expect(enzymeWrapper.find('a').text()).toBe(text);
      });

      it('should call onClick when the text is clicked', () => {
        const text = 'DO TEST';
        const testMock = jest.fn();
        const { enzymeWrapper, props } = setup(false, text, testMock);
        enzymeWrapper.find('a').simulate('click');
        expect(testMock).toBeCalled();
      });
    });
  });
});
