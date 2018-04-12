import React from 'react';
import { shallow } from 'enzyme';

import Posts from './Posts';

function setup(posts = []) {
  const props = {
    posts
  };

  const enzymeWrapper = shallow(<Posts {...props}/>);

  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('<Posts />', () => {
    it('should render <li> with passed posts', () => {
      const posts = ['test post 1', 'test post 2'];
      const { enzymeWrapper } = setup(posts);

      expect(enzymeWrapper.find('li').length).toBe(posts.length);
    });
  });
});
