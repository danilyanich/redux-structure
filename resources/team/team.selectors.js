export const getTeams = store => store.team;

export const getTeam = (store, _id) => getTeams(store)[_id];

export const getTeamsByIds = (store, idList) => idList.map(_id =>
  getTeam(store, _id))
  .sort((a, b) => a.type !== 'Personal');

export const getTeamGoals = (store, _id) => [
  ...getTeam(store, _id).openGoals,
  ...getTeam(store, _id).closeGoals,
];

export const getTeamOpenGoals = (store, _id) => getTeam(store, _id).openGoals;

export const getTeamMembers = (store, _id) => getTeam(store, _id).members
  .sort((a, b) => (a.firstName > b.firstName ? 1 : -1))
  .sort((a, b) => (a.role > b.role ? 1 : -1));

export const getTeamAdmins = (store, _id) => getTeamMembers(store, _id)
  .filter(item => item.role === 'admin');

export const getTeamArray = state =>
  Object.keys(getTeams(state)).map(teamId => getTeam(state, teamId));

export const getMembersBySearchQuery = (store, _id) => (searchQuery) => {
  const team = getTeam(store, _id);
  if (team) {
    return team.members
      .filter(member => `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  return [];
};

export const getCurrentUserTeams = store =>
  getTeamsByIds(store, store.user[store.appSettings.currentUserId].teams);
