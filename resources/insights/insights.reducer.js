import initialState from './insights.data';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOST_APPRECIATED_USER':
      return {
        ...state,
        mostAppreciatedUser: action.user,
      };
    case 'SET_MOST_LOVED_UPDATE':
      return {
        ...state,
        mostLovedUpdate: action.update,
      };
    default:
      return state;
  }
};
