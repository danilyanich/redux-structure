import * as api from './team.api';

export const fetchTeam = id => dispatch =>
  api.fetchTeam(id).then(payload => dispatch({ type: 'FETCH_TEAM', payload }));

export const fetchTeamsFromUser = id => dispatch =>
  api.fetchTeamsFromUser(id).then(payload => dispatch({ type: 'FETCH_TEAMS', payload }));

export const createTeam = payload => dispatch => dispatch({ type: 'CREATE_TEAM', payload });

export const editTeam = payload => dispatch => dispatch({ type: 'EDIT_TEAM', payload });

export const addMember = payload => dispatch => dispatch({ type: 'ADD_MEMBER', payload });

export const addTeamToParentTeam = payload => dispatch => dispatch({ type: 'ADD_TEAM_TO_PARENT_TEAM', payload });

export const changeMemberRole = payload => dispatch => dispatch({ type: 'CHANGE_MEMBER_ROLE', payload });

export const removeMember = payload => dispatch => dispatch({ type: 'REMOVE_MEMBER', payload });
