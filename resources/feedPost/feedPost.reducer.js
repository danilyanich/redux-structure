import { FETCH_FEED_POST, FETCH_FEED_POSTS } from './feedPost.actions';

import initialState from './feedPost.data';

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEED_POST:
      return action.payload;
    case FETCH_FEED_POSTS:
      return action.payload;
    case 'CREATE_FEED_POST':
      return { ...state, [action._id]: action.feedPost };
    case 'LIKE_FEED_POST': {
      const newLikes = state[action.payload.postId].likes
        .concat(action.payload.userId);
      return {
        ...state, [action.payload.postId]: { ...state[action.payload.postId], likes: newLikes },
      };
    }
    case 'UNLIKE_FEED_POST': {
      const newLikes = state[action.payload.postId].likes
        .filter(id => id !== action.payload.userId);
      return {
        ...state, [action.payload.postId]: { ...state[action.payload.postId], likes: newLikes },
      };
    }
    default:
      return state;
  }
};
