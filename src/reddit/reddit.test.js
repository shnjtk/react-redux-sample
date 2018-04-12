import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import reducers, { actions } from './reddit';
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT
} from './reddit';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('reddit', () => {
  describe('reducers', () => {
    describe('selectedSubreddit', () => {
      it('should return subreddit to SELECT_SUBREDDIT action', () => {
        const action = { type: SELECT_SUBREDDIT, subreddit: 'reactjs' };
        expect(reducers.selectedSubreddit(undefined, action)).toBe(action.subreddit);
      });

      it('should return a default state to invalid action', () => {
        const action = { type: 'INVALID_ACTION' };
        expect(reducers.selectedSubreddit(undefined, action)).toBe('reactjs');
      })
    });

    describe('postsBySubreddit', () => {
      it('should return an invalidate state to INVALIDATE_SUBREDDIT action', () => {
        const subreddit = 'reactjs';
        const action = { type: INVALIDATE_SUBREDDIT, subreddit };
        const expectedState = {
          [subreddit]: {
            isFetching: false,
            didInvalidate: true,
            items: []
          }
        };
        expect(reducers.postsBySubreddit(undefined, action)).toEqual(expectedState);
      });

      it('should return a isFetching state to REQUEST_POSTS action', () => {
        const subreddit = 'reactjs';
        const action = { type: REQUEST_POSTS, subreddit };
        const expectedState = {
          [subreddit]: {
            isFetching: true,
            didInvalidate: false,
            items: []
          }
        };
        expect(reducers.postsBySubreddit(undefined, action)).toEqual(expectedState);
      });

      it('should return received posts to RECEIVE_POSTS action', () => {
        const subreddit = 'reactjs';
        const posts = ['received data'];
        const time = Date.now();
        const action = {
          type: RECEIVE_POSTS,
          posts,
          receivedAt: time,
          subreddit
        };
        const expectedState = {
          [subreddit]: {
            isFetching: false,
            didInvalidate: false,
            items: posts,
            lastUpdated: time
          }
        };
        expect(reducers.postsBySubreddit(undefined, action)).toEqual(expectedState);
      });

      it('should return a default state to invalid action', () => {
        const action = { type: 'INVALID_ACTION' };
        expect(reducers.postsBySubreddit(undefined, action)).toEqual({});
      })
    });
  });

  describe('action creators', () => {
    describe('synchronous action creators', () => {
      it('should create an action to select subreddit', () => {
        const subreddit = 'reactjs';
        const expectedAction = {
          type: SELECT_SUBREDDIT,
          subreddit
        };
        expect(actions.selectSubreddit(subreddit)).toEqual(expectedAction);
      });

      it('should create an action to invalidate subreddit', () => {
        const subreddit = 'reactjs';
        const expectedAction = {
          type: INVALIDATE_SUBREDDIT,
          subreddit
        };
        expect(actions.invalidateSubreddit(subreddit)).toEqual(expectedAction);
      });

      it('should create an action to request posts', () => {
        const subreddit = 'reactjs';
        const expectedAction = {
          type: REQUEST_POSTS,
          subreddit
        };
        expect(actions.requestPosts(subreddit)).toEqual(expectedAction);
      });

      it('should create an action to pass received posts', () => {
        const subreddit = 'reactjs';
        const receivedAt = Date.now();
        const posts = [
          {data: 'test data 1'},
          {data: 'test data 2'}
        ];
        const json = {
          data: {
            children: posts
          },
          receivedAt
        };
        const expectedAction = {
          type: RECEIVE_POSTS,
          subreddit,
          posts: posts.map(post => post.data),
          receivedAt
        };
        expect(actions.receivePosts(subreddit, json)).toEqual(expectedAction);
      });
    });

    describe('asynchronous action creators', () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it('should create an action to fetch posts', () => {
        const subreddit = 'reactjs';
        const post1 = { data: 'test data 1' };
        const post2 = { data: 'test data 2' };
        const receivedAt = Date.now();
        const response = {
          data: {
            children: [post1, post2]
          },
          receivedAt
        };

        const store = mockStore({});

        nock('https://www.reddit.com/')
          .get(`/r/${subreddit}.json`)
          .reply(200, response);

        const expectedActions = [
          { type: REQUEST_POSTS, subreddit },
          { type: RECEIVE_POSTS, subreddit,
            posts: [post1.data, post2.data], receivedAt }
        ];

        return store.dispatch(actions.fetchPosts(subreddit)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
      });

      it('should create an action to fetch posts if no posts are in state', () => {
        const subreddit = 'reactjs';
        const state = { postsBySubreddit: {} };
        const store = mockStore(state);

        const post1 = { data: 'test data 1' };
        const post2 = { data: 'test data 2' };
        const receivedAt = Date.now();
        const response = {
          data: {
            children: [post1, post2]
          },
          receivedAt
        };

        nock('https://www.reddit.com/')
          .get(`/r/${subreddit}.json`)
          .reply(200, response);

        const expectedActions = [
          { type: REQUEST_POSTS, subreddit },
          { type: RECEIVE_POSTS, subreddit,
            posts: [post1.data, post2.data], receivedAt }
        ];

        return store.dispatch(actions.fetchPostsIfNeeded(subreddit)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('should not fetch posts if it\'s fetching currently', () => {
        const subreddit = 'reactjs';
        const getState = () => (
          {
            postsBySubreddit: {
              [subreddit]: {
                isFetching: true
              }
            }
          }
        );
        const dispatch = jest.fn();

        actions.fetchPostsIfNeeded(subreddit)(dispatch, getState);
        expect(dispatch).not.toBeCalled();
      });

      it('should not fetch posts if it\'s already fetched and not invalidated', () => {
        const subreddit = 'reactjs';
        const getState = () => (
          {
            postsBySubreddit: {
              [subreddit]: {
                isFetching: false,
                didInvalidate: false
              }
            }
          }
        );
        const dispatch = jest.fn();

        actions.fetchPostsIfNeeded(subreddit)(dispatch, getState);
        expect(dispatch).not.toBeCalled();
      });

      it('should fetch posts if it\'s already fetched but invalidated', () => {
        const subreddit = 'reactjs';
        const state = { postsBySubreddit: {
          [subreddit]: {
            isFetching: false,
            didInvalidate: true
          }
        }};
        const store = mockStore(state);

        const post1 = { data: 'test data 1' };
        const post2 = { data: 'test data 2' };
        const receivedAt = Date.now();
        const response = {
          data: {
            children: [post1, post2]
          },
          receivedAt
        };

        nock('https://www.reddit.com/')
          .get(`/r/${subreddit}.json`)
          .reply(200, response);

        const expectedActions = [
          { type: REQUEST_POSTS, subreddit },
          { type: RECEIVE_POSTS, subreddit,
            posts: [post1.data, post2.data], receivedAt }
        ];

        return store.dispatch(actions.fetchPostsIfNeeded(subreddit)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });
});
