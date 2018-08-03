import { apiClient } from 'helpers/api'; // eslint-disable-line
import goalsData from './goal.data';

export const fetchGoal = id =>
  apiClient.get.then(() => goalsData[id]);

export const fetchGoalsFromUser = id =>
  apiClient.get.then(() =>
    goalsData.filter(goal =>
      goal.owners.find(assigner => assigner._id === id)));

export const fetchGoalsFromTeam = id =>
  apiClient.get.then(() =>
    goalsData.filter(goal => goal.teamId === id));

export const createGoal = data =>
  apiClient.post().then(result => result);
