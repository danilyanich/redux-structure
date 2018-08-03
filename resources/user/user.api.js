import { apiClient as fakeApiClient } from 'helpers/api';
import apiClient from 'helpers/api/true.api.client';
import usersData from './user.data';


export const fetchUser = (id) => {
  return fakeApiClient.get.then(() => {
    return usersData.users.find(item => item._id === id);
  });
};

export const fetchCurrentUser = () => {
  return fakeApiClient.get.then(() => {
    return usersData.currentUser;
  });
};

export const updateUser = data =>
  apiClient.put('users/current/', data, { multipart: true });
