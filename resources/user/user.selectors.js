export const getUsers = store => store.user;

export const getUser = (store, _id) => getUsers(store)[_id];

export const getUsersByIds = (store, list) => list.map(id => getUser(store, id));

export const getUserArray = state =>
  Object.keys(getUsers(state)).map(userId => getUser(state, userId));

export const getCurrentUser = store => getUser(store, store.appSettings.currentUserId);

export const getCurrentUserId = store => getCurrentUser(store)._id;

export const getCurrentUserTeamIds = store => getCurrentUser(store).teams;

export const getCurrentUserImage = store => getCurrentUser(store).image;

export const getIsVisitingFirstTime = store => getCurrentUser(store).isVisitingFirstTime;
