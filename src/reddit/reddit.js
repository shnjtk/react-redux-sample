// State shape
// {
//   selectedSubreddit: 'frontend',
//   postsBySubreddit: {
//     frontend: {
//       isFetching: true,
//       didInvalidate: false,
//       items: []
//     },
//     reactjs: {
//       isFetching: false,
//       didInvalidate: false,
//       lastUpdated: 1439478405547,
//       items: [
//         {
//           id: 42,
//           title: 'Confusion about Flux and Relay'
//         },
//         {
//           id: 500,
//           title: 'Creating a Simple Application Using React JS and Flux Architecture'
//         }
//       ]
//     }
//   }
// }

import 'isomorphic-fetch';

// ==================================================
// Actions
// ==================================================
export const REQUEST_POSTS        = 'react-redux-boilerplate/reddit/REQUEST_POSTS';
export const RECEIVE_POSTS        = 'react-redux-boilerplate/reddit/RECEIVE_POSTS';
export const SELECT_SUBREDDIT     = 'react-redux-boilerplate/reddit/SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'react-redux-boilerplate/reddit/INVALIDATE_SUBREDDIT';

// ==================================================
// Reducers
// ==================================================
const reducers = {
  selectedSubreddit,
  postsBySubreddit
};

export default reducers;

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

const initialPostsState = {
  isFetching: false,
  didInvalidate: false,
  items: []
};

function posts(state = initialPostsState, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      });
    default:
      return state;
  }
}

// ==================================================
// Action Creators
// ==================================================
const selectSubreddit = subreddit => {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
};

const invalidateSubreddit = subreddit => {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
};

const requestPosts = subreddit => {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
};

const receivePosts = (subreddit, json) => {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: json.receivedAt || Date.now()
  };
};

const fetchPosts = subreddit => {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  };
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
};

const fetchPostsIfNeeded = (subreddit) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  }
};

export const actions = {
  selectSubreddit,
  invalidateSubreddit,
  requestPosts,
  receivePosts,
  fetchPosts,
  fetchPostsIfNeeded
};
