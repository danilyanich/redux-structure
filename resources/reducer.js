import { combineReducers } from 'redux';

import toast, * as fromToast from 'components/common/toast/toast.reducer';

import user from './user/user.reducer';
import team from './team/team.reducer';
import goal from './goal/goal.reducer';
import feedPost from './feedPost/feedPost.reducer';
import insights from './insights/insights.reducer';
import appSettings from './appSettings/appSettings.reducer';

export default combineReducers({
  user,
  team,
  goal,
  feedPost,
  toast,
  insights,
  appSettings,
});

export const getToasterMessages = (state, filter) => {
  return fromToast.getToasterMessages(state.toast, filter);
};
