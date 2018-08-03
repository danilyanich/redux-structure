import moment from 'moment';

export const getGoals = state => state.goal;

export const getGoal = (state, _id) => getGoals(state)[_id];

export const getGoalNameById = (state, props) =>
  getGoals(state).find(goal => goal._id === props.goalId).title;

export const getGoalArray = state =>
  Object.keys(getGoals(state))
    .map(goalId => getGoal(state, goalId))
    .filter(goal =>
      (moment(goal.startDate).year() * 4) + moment(goal.startDate).quarter() <=
      (state.appSettings.year * 4) + state.appSettings.quarter &&
      (moment(goal.endDate).year() * 4) + moment(goal.endDate).quarter() >=
      (state.appSettings.year * 4) + state.appSettings.quarter)
    .sort((a, b) => a.status < b.status);

export const getGoalsByTeamId = (state, teamId) =>
  getGoalArray(state)
    .filter(goal => goal.parentTeam === teamId)
    .sort((goal1, goal2) => goal1.status < goal2.status);

export const getGoalArrayByUser = (state, id) =>
  (id ? getGoalArray(state).filter(goal => goal.assigners.includes(id))
    : getGoalArray(state));

export const getOpenGoalArrayByUser = (state, id) =>
  getGoalArrayByUser(state, id).filter(goal => goal.status === 'Open');

export const getCurrentUserGoals = state =>
  getGoalArrayByUser(state, state.appSettings.currentUserId);

export const getOpenGoalsByTeamId = (state, teamId) =>
  getGoalArray(state)
    .filter(goal => goal.parentTeam === teamId && goal.status === 'Open')
    .sort((g1, g2) => g1.startDate > g2.startDate);

export const getGoalAssigners = (state, id) =>
  getGoal(state, id).assigners;

/* eslint-disable no-param-reassign */
export const getGoalsMapData = (store) => {
  const goalsMap = { ...store.user[store.appSettings.currentUserId] };
  goalsMap.goals = [];

  const data = { ...store.team };
  (function recursiveTraversal(parentNode) {
    const teams = parentNode.teams ? parentNode.teams : parentNode.childTeams;
    // parentNode.newOffset += 0.5;
    teams.forEach((item) => {
      const team = { ...data[item] };
      if (parentNode !== goalsMap || !team.parentTeam) {
        // || team.parentTeam === goalsMap.personalTeam
        if (!parentNode.groups) {
          parentNode.groups = [];
        }
        const groupGoals = [];
        team.openGoals.forEach((goalId) => {
          const goal = store.goal[goalId];
          const assignersArray = [];
          goal.assigners.forEach((assignerId) => {
            const assigner = store.user[assignerId];
            assignersArray.push({
              _id: assigner._id,
              name: `${assigner.firstName} ${assigner.lastName}`,
              image: assigner.image,
            });
          });

          groupGoals.push({
            _id: goalId,
            assigners: assignersArray,
            name: goal.title,
            generalProgress: goal.progress,
            totalLikesNumber: goal.totalLikesNumber,
          });
        });
        if (team._id === goalsMap.personalTeam) {
          goalsMap.goals = [...groupGoals];
          if (goalsMap.newOffset) {
            goalsMap.newOffset += groupGoals.length;
          } else {
            goalsMap.newOffset = groupGoals.length;
          }
          team.goals = [];
        } else {
          team.goals = [...groupGoals];
        }
        // team.newOffset = (team.goals.length + team.childTeams.length) / 2;
        team.newOffset = team.goals.length + team.childTeams.length;
        // team.newOffset = (team.goals.length + team.childTeams.length) / 2;
        if (parentNode.newOffset) {
          parentNode.newOffset += team.newOffset;
          // parentNode.newOffset += (team.newOffset / 2);
          // parentNode.newOffset += (team.newOffset + 1) / 2;
        } else {
          parentNode.newOffset = team.newOffset;
          // parentNode.newOffset = team.newOffset / 2;
        }

        team.groups = [];
        if (team.parentTeam === goalsMap.personalTeam) {
          goalsMap.groups.push(team);
        } else if (team._id !== goalsMap.personalTeam) {
          parentNode.groups.push(team);
        }

        recursiveTraversal(team);
      }
    });
  }(goalsMap));
  return goalsMap;
};

export const searchGoalByQuery = (goalList, query) => {
  return query
    ? goalList.filter(goal => goal.title.toLowerCase().includes(query.toLowerCase().trim()))
    : goalList;
};
