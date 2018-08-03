import initialGoals from './goal.data';

export default (state = initialGoals, action) => {
  switch (action.type) {
    case 'UPDATE_GOAL':
      return { ...state, [action.payload._id]: action.payload };
    case 'CREATE_GOAL':
      return { ...state, [action.payload._id]: action.payload };
    case 'MOVE_ASSIGNER': {
      let newState;
      if (state[action.payload._id].assigners.includes(action.payload.assignerId)) {
        newState = {
          ...state,
          [action.payload._id]: {
            ...state[action.payload._id],
            assigners: state[action.payload._id].assigners.filter(assigner =>
              assigner !== action.payload.assignerId),
          },
        };
      } else {
        newState = {
          ...state,
          [action.payload._id]: {
            ...state[action.payload._id],
            assigners: [...state[action.payload._id].assigners, action.payload.assignerId],
          },
        };
      }
      return { ...newState };
    }
    case 'UPDATE_TITLE':
      return {
        ...state,
        [action.payload._id]: {
          ...state[action.payload._id],
          title: action.payload.title,
        },
      };
    case 'UPDATE_DESCRIPTION':
      return {
        ...state,
        [action.payload._id]: {
          ...state[action.payload._id],
          description: action.payload.description,
        },
      };
    case 'DELETE_GOAL': {
      const newState = { ...state };
      delete newState[action.payload.goalId];
      return newState;
    }
    case 'LIKE_FEED_POST': {
      return {
        ...state,
        [action.payload.goalId]: {
          ...state[action.payload.goalId],
          totalLikesNumber: state[action.payload.goalId].totalLikesNumber + 1,
        },
      };
    }
    case 'UNLIKE_FEED_POST': {
      return {
        ...state,
        [action.payload.goalId]: {
          ...state[action.payload.goalId],
          totalLikesNumber: state[action.payload.goalId].totalLikesNumber - 1,
        },
      };
    }
    case 'ADD_LABEL': {
      const isExist = state[action.payload.goalId].labels.some(label =>
        (label.color === action.payload.labelColor
        && label.content === action.payload.value));
      const labels = isExist
        ? state[action.payload.goalId].labels.filter(label =>
          (label.color !== action.payload.labelColor || label.content !== action.payload.value))
        : [...state[action.payload.goalId].labels,
          { color: action.payload.labelColor, content: action.payload.value }];
      return {
        ...state,
        [action.payload.goalId]: {
          ...state[action.payload.goalId],
          labels,
        },
      };
    }
    default:
      return state;
  }
};
