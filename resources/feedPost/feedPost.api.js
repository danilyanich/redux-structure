import { apiClient } from 'helpers/api';
import feedPostsData from './feedPost.data';

export const fetchFeedPost = (id) => {
  return apiClient.get.then(() => {
    return feedPostsData.find(item => item._id === id);
  });
};

export const fetchFeedPostsFromUser = (id) => {
  return apiClient.get.then(() => {
    return feedPostsData.filter(item => item.author._id === id);
  });
};
