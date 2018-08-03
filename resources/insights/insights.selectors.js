import { getFeedPostsByType } from 'resources/feedPost/feedPost.selectors';

export const getGoals = state => state.insights.goals;

export const getOverallProgress = state => state.insights.overallProgress;

export const getContributors = state => state.insights.contributors;

export const getMostAppreciatedUser = state => state.insights.mostAppreciatedUser;

export const getMostLovedUpdate = state => state.insights.mostLovedUpdate;

export const findMostAppreciatedUser = (state) => {
  const feedPosts = getFeedPostsByType(state, 'feed');
  const mostLikes = Math.max(...(feedPosts.map(post => post.likes.length)));
  const mostLikedPosts = feedPosts.filter(post => post.likes.length === mostLikes);
  const mostLikedPost = mostLikedPosts[Math.floor(Math.random() * mostLikedPosts.length)];
  return {
    likeNumber: mostLikedPost.likes.length,
    user: mostLikedPost.creator,
  };
};

export const findMostLovedUpdate = (state) => {
  const feedPosts = getFeedPostsByType(state, 'feed');
  const mostLikes = Math.max(...(feedPosts.map(post => post.likes.length)));
  const mostLikedPosts = feedPosts.filter(post => post.likes.length === mostLikes);
  const mostLikedPost = mostLikedPosts[Math.floor(Math.random() * mostLikedPosts.length)];
  return {
    title: mostLikedPost.title,
    delta: mostLikedPost.delta,
    progress: mostLikedPost.progress,
    goalId: mostLikedPost.goalId,
  };
};
