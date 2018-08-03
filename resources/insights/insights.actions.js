export const setMostAppreciatedUser = user => dispatch =>
  dispatch({
    type: 'SET_MOST_APPRECIATED_USER',
    user,
  });

export const setMostLovedUpdate = update => dispatch =>
  dispatch({
    type: 'SET_MOST_LOVED_UPDATE',
    update,
  });
