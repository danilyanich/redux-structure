import initialState from './team.data';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TEAM': {
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    }
    case 'EDIT_TEAM': {
      const {
        teamId,
        name,
        description,
        privacy,
        image,
      } = action.payload;
      return {
        ...state,
        [teamId]: {
          ...state[teamId],
          name,
          description,
          privacy,
          image,
        },
      };
    }
    case 'ADD_MEMBER': {
      const { teamId, member } = action.payload;
      const members = [...state[teamId].members, member];

      return {
        ...state,
        [teamId]: {
          ...state[teamId],
          members,
        },
      };
    }
    case 'CHANGE_MEMBER_ROLE': {
      const { teamId, memberId, newRole } = action.payload;
      const team = { ...state[teamId] };
      const newMember = {
        ...team.members.find(member => member._id === memberId),
        role: newRole,
      };
      const members = [
        ...team.members.filter(member => member._id !== memberId),
        newMember,
      ];

      return {
        ...state,
        [teamId]: {
          ...team,
          members,
        },
      };
    }
    case 'ADD_TEAM_TO_PARENT_TEAM': {
      const { parentTeamId, childTeamId } = action.payload;
      const childTeams = [...state[parentTeamId].childTeams, childTeamId];

      return {
        ...state,
        [parentTeamId]: {
          ...state[parentTeamId],
          childTeams,
        },
      };
    }
    case 'REMOVE_MEMBER': {
      const { teamId, memberId } = action.payload;
      const members = state[teamId].members.filter(member => member._id !== memberId);

      return {
        ...state,
        [teamId]: {
          ...state[teamId],
          members,
        },
      };
    }
    case 'CLOSE_GOAL': {
      const { teamId, goalId } = action.payload;
      const openGoals = state[teamId].openGoals.filter(item => item !== goalId);
      const closeGoals = [...state[teamId].closeGoals, goalId];

      return {
        ...state,
        [teamId]: {
          ...state[teamId],
          openGoals,
          closeGoals,
        },
      };
    }
    case 'ADD_GOAL_TO_TEAM': {
      const openGoals = [...state[action.payload.parentTeam].openGoals, action.payload._id];
      return {
        ...state,
        [action.payload.parentTeam]: {
          ...state[action.payload.parentTeam],
          openGoals,
        },
      };
    }
    case 'DELETE_GOAL': {
      return {
        ...state,
        [action.payload.teamId]: {
          ...state[action.payload.teamId],
          openGoals: [...state[action.payload.teamId].openGoals
            .filter(id => id !== action.payload.goalId)],
          closeGoals: [...state[action.payload.teamId].closeGoals
            .filter(id => id !== action.payload.goalId)],
        },
      };
    }
    case 'UPDATE_USER': {
      const {
        teams, firstName, lastName, image, username, _id,
      } = action.payload;

      const newState = { ...state };

      teams.forEach((teamId) => {
        const newMember = {
          _id,
          firstName,
          lastName,
          username,
          image,
          role: state[teamId].members.find(mem => mem._id === _id).role,
        };

        const members = [
          ...state[teamId].members.filter(mem => mem._id !== _id),
          newMember,
        ];

        newState[teamId] = {
          ...state[teamId],
          members,
        };
      });

      return newState;
    }
    default:
      return state;
  }
};
