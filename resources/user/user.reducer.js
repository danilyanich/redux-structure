import initialUsers from './user.data';

const getUser = payload => ({
  bio: '',
  personalTeam: payload.teamId,
  teams: [payload.teamId],
  notifications: [],
  settings: {
    emailNotifications: {
      checkInReminder: {
        isActive: true,
        every: 'Friday',
        at: '12 AM',
      },
      weeklySummary: {
        isActive: true,
        every: 'Friday',
        at: '12 AM',
      },
    },
    timeZone: 'UTC +3',
  },
  selectedTeamId: null,
  selectedGoalId: null,
});

const users = (state = initialUsers, { type, payload = {} }) => {
  switch (type) {
    case 'CREATE_USER':
      return { ...state, [payload._id]: payload };

    case 'UPDATE_USER':
      return { ...state, [payload._id]: payload };

    case 'GET_CURRENT_USER': {
      const id = Object.keys(state).find(item => state[item].email === payload.user.email);

      if (!payload.isNew) {
        return {
          ...state,
          [id]: {
            ...payload.user,
            ...state[id],
            personalTeam: payload.teamId,
            teams: [payload.teamId, ...state[id].teams],
          },
        };
      }
      return {
        ...state,
        [payload.user._id]: { ...getUser(payload), ...payload.user },
      };
    }
    case 'ADD_TEAM_TO_CURRENT_USER': {
      const user = {
        ...state[payload._id],
        teams: [
          ...state[payload._id].teams,
          payload.teamId,
        ],
      };
      return {
        ...state,
        [payload._id]: user,
      };
    }
    case 'REMOVE_MEMBER': {
      const user = {
        ...state[payload.memberId],
        teams: state[payload.memberId].teams.filter(id => id !== payload.teamId),
      };
      return {
        ...state,
        [payload.memberId]: user,
      };
    }
    case 'SHOW_NOTIFICATIONS': {
      const user = {
        ...state[payload._id],
        notifications: state[payload._id].notifications.map(notification => ({
          ...notification,
          seen: true,
        })),
      };
      return {
        ...state,
        [payload._id]: user,
      };
    }

    case 'SEND_NOTIFICATION': {
      const user = {
        ...state[payload.receiver],
        notifications: [
          payload,
          ...state[payload.receiver].notifications,
        ],
      };
      return {
        ...state,
        [payload.receiver]: user,
      };
    }
    default:
      return state;
  }
};

export default users;
