import * as api from './feedPost.api';

export const FETCH_FEED_POST = 'fetchFeedPost';
export const FETCH_FEED_POSTS = 'fetchFeedPosts';

export const fetchFeedPost = id => dispatch =>
  api.fetchFeedPost(id).then(payload => dispatch({ type: FETCH_FEED_POST, payload }));

export const createFeedPost = feedPost => dispatch => dispatch({ type: 'CREATE_FEED_POST', feedPost, _id: feedPost._id });

export const likeFeedPost = payload => dispatch => dispatch({ type: 'LIKE_FEED_POST', payload });

export const unlikeFeedPost = payload => dispatch => dispatch({ type: 'UNLIKE_FEED_POST', payload });
