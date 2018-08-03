import moment from 'moment';

const initialState = {
  quarter: moment().quarter(),
  year: moment().year(),
};
export default (state = initialState, { type = '', payload }) => {
  switch (type) {
    case 'SELECT_TEAM': {
      return { ...state, selectedTeamId: payload.selectedTeamId };
    }
    case 'GET_CURRENT_USER': {
      return { ...state, currentUserId: payload.user._id };
    }
    case 'SET_CURRENT_USER_ID': {
      return { ...state, currentUserId: payload._id };
    }
    case 'INCREMENT_QUARTER': {
      if (payload.e.keyCode && payload.e.keyCode !== 13) return state;
      return {
        ...state,
        quarter: ((state.quarter) % 4) + 1,
        year: state.quarter === 4 ? state.year + 1 : state.year,
      };
    }
    case 'DECREMENT_QUARTER': {
      if (payload.e.keyCode && payload.e.keyCode !== 13) return state;
      return {
        ...state,
        quarter: ((state.quarter + 2) % 4) + 1,
        year: state.quarter === 1 ? state.year - 1 : state.year,
      };
    }
    default:
      return state;
  }
};
