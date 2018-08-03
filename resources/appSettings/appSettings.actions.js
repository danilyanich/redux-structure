export const selectTeam = selectedTeamId => dispatch =>
  dispatch({ type: 'SELECT_TEAM', payload: { selectedTeamId } });

export const setCurrentUserId = _id => dispatch =>
  dispatch({ type: 'SET_CURRENT_USER_ID', payload: { _id } });

export const decrementQuarter = e => dispatch =>
  dispatch({ type: 'DECREMENT_QUARTER', payload: { e } });

export const incrementQuarter = e => dispatch =>
  dispatch({ type: 'INCREMENT_QUARTER', payload: { e } });
