import { apiClient } from 'helpers/api'; //eslint-disable-line
import teamsData from './team.data';
import usersData from '../user/user.data';

export const fetchTeam = (id) => {
  return apiClient.get.then(() => {
    return teamsData.find(item => item._id === id);
  });
};

export const fetchTeamsFromUser = (id) => {
  return apiClient.get.then(() => {
    const { teamsIds } = usersData.users.find(item => item._id === id);
    return teamsData.filter(team => teamsIds.includes(team._id));
  });
};
