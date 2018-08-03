
import moment from 'moment';

export const getFeedPost = (state, _id) => state.feedPost[_id];

export const getAllFeedPosts = state =>
  Object.keys(state.feedPost).map(postId => state.feedPost[postId])
    .sort((post1, post2) => moment(post2.date) - moment(post1.date));

export const getFeedPostsByUser = (state, id) => {
  return getAllFeedPosts(state).filter(post => post.creator._id === id);
};

export const getFeedPostsByGoal = (state, id) => {
  return getAllFeedPosts(state).filter(post => post.goalId === id);
};

export const getFeedPostsByType = (state, type, id) => {
  switch (type) {
    case 'byUser':
      return getFeedPostsByUser(state, id);
    case 'byGoal':
      return getFeedPostsByGoal(state, id);
    case 'feed': {
      const curId = state.appSettings.currentUserId;
      const curTeams = state.user[curId].teams;

      return curTeams.reduce((acc, teamId) => {
        const { openGoals } = state.team[teamId];
        const { closeGoals } = state.team[teamId];

        const posts = [...openGoals, ...closeGoals].reduce((innerAcc, goalId) =>
          [...innerAcc, ...getFeedPostsByGoal(state, goalId)], []);
        return [...acc, ...posts];
      }, []).sort((post1, post2) => moment(post2.date) - moment(post1.date));
    }
    default:
      return getAllFeedPosts(state);
  }
};

export const getFeedPostsCountByType = (state, type, id) => {
  return getFeedPostsByType(state, type, id).length;
};

export const getIsAlreadyLiked = (state, id) => {
  return getFeedPost(state, id).likes.includes(state.appSettings.currentUserId);
};
