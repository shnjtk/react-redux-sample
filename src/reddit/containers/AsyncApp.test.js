import React from 'react';
import { mount } from 'enzyme';

import { AsyncApp, mapStateToProps } from './AsyncApp';

const defaultProps = {
  selectedSubreddit: 'reactjs',
  posts: [],
  isFetching: false,
  lastUpdated: undefined,
  dispatch: () => {}
};

const setup = (options) => {
  const props = {
    ...defaultProps,
    ...options
  };
  const enzymeWrapper = mount(<AsyncApp {...props}/>);

  return {
    props,
    enzymeWrapper
  };
};

describe('containers', () => {
  describe('<AsyncApp />', () => {
    it('should render <Picker /> with a passed subreddit', () => {
      const subreddit = 'reactjs';
      const { enzymeWrapper } = setup({subreddit});

      expect(enzymeWrapper.find('Picker').props().value).toEqual(subreddit);
    });

    it('should render "Loading" message during fetch', () => {
      const subreddit = 'reactjs';
      const isFetching = true;
      const { enzymeWrapper } = setup({subreddit, isFetching});

      expect(enzymeWrapper.find('h2').text()).toEqual('Loading...');
    });

    it('should render last updated time when the posts exists', () => {
      const subreddit = 'reactjs';
      const lastUpdated = Date.now();
      const { enzymeWrapper } = setup({subreddit, lastUpdated});

      expect(enzymeWrapper.find('.lastUpdated').text()).toEqual(expect.stringMatching(/^Last updated at/));
    });

    it('should invoke dispatch method on componentDidMount', () => {
      const dispatch = jest.fn();
      const { enzymeWrapper } = setup({dispatch});

      expect(dispatch).toBeCalled();
    });

    it('should invoke dispatch method when the props is updated', () => {
      const dispatch = jest.fn();
      const { enzymeWrapper } = setup({dispatch});

      const subreddit = 'frontend';
      const newProps = {
        ...defaultProps,
        selectedSubreddit: subreddit
      };
      enzymeWrapper.setProps(newProps);

      expect(dispatch).toBeCalled();
    });

    it('should not invoke dispatch method when the props is updated but subreddit is not changed', () => {
      const { enzymeWrapper } = setup();

      const dispatch = jest.fn();
      const newProps = {
        ...defaultProps,
        dispatch
      };
      enzymeWrapper.setProps(newProps);

      expect(dispatch).not.toBeCalled();
    });

    it('should invoke dispatch method when the select value is changed', () => {
      const dispatch = jest.fn();
      const { enzymeWrapper } = setup({dispatch});

      enzymeWrapper.find('select').simulate('change', {target: {value: 'frontend'}});
      expect(dispatch).toBeCalled();
    });

    it('should invoke dispatch method when the "Refresh" is clicked', () => {
      const dispatch = jest.fn();
      const { enzymeWrapper } = setup({dispatch});

      enzymeWrapper.find('a').simulate('click');
      expect(dispatch).toBeCalled();
    });

    it('should return props from state', () => {
      const posts = ['test data'];
      const lastUpdated = Date.now();
      const selectedSubreddit = 'reactjs';
      const isFetching = false;
      const postsBySubreddit = {
        [selectedSubreddit]: {
          isFetching,
          lastUpdated,
          items: posts
        }
      };
      const state = {
        selectedSubreddit,
        postsBySubreddit
      };

      const expectedProps = {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
      };
      expect(mapStateToProps(state)).toEqual(expectedProps);
    })
  });
});
