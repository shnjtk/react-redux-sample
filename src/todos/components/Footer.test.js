import React from 'react';
import { shallow } from 'enzyme';

import Footer from './Footer';

function setup() {
  const enzymeWrapper = shallow(<Footer />);

  return {
    enzymeWrapper
  };
}

describe('component', () => {
  describe('<Footer />', () => {
    it('should render six children', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('p').children().length).toBe(6);
    });
  });
});
