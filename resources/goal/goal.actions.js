export const createGoal = payload => (dispatch) => {
  dispatch({ type: 'CREATE_GOAL', payload });
  dispatch({ type: 'ADD_GOAL_TO_TEAM', payload });
};

export const updateGoal = payload => dispatch => dispatch({ type: 'UPDATE_GOAL', payload });

export const moveAssigner = payload => dispatch => dispatch({ type: 'MOVE_ASSIGNER', payload });

export const updateTitle = payload => dispatch => dispatch({ type: 'UPDATE_TITLE', payload });

export const addLabel = (labelColor, value, goalId) => dispatch => dispatch({ type: 'ADD_LABEL', payload: { labelColor, value, goalId } });

export const updateDescription = payload => dispatch => dispatch({ type: 'UPDATE_DESCRIPTION', payload });

export const closeGoal = (updatedGoal, selectedTeamId) => (dispatch) => {
  dispatch({ type: 'UPDATE_GOAL', payload: updatedGoal });
  dispatch({ type: 'CLOSE_GOAL', payload: { teamId: selectedTeamId, goalId: updatedGoal._id } });
};

export const deleteGoal = (goalId, teamId) => dispatch => dispatch({ type: 'DELETE_GOAL', payload: { goalId, teamId } });
