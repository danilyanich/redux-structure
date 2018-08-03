import moment from 'moment';
import { getCurrentUser, sendNotification } from 'resources/user/user.actions';
import { createTeam } from 'resources/team/team.actions';
import { createGoal, closeGoal } from 'resources/goal/goal.actions';
import { createFeedPost, likeFeedPost } from 'resources/feedPost/feedPost.actions';
import { selectTeam, setCurrentUserId } from 'resources/appSettings/appSettings.actions';
import { setMostAppreciatedUser, setMostLovedUpdate } from 'resources/insights/insights.actions';
import { findMostAppreciatedUser, findMostLovedUpdate } from 'resources/insights/insights.selectors';

export const initialAction = (store) => {
  const id = Object.keys(store.getState().user)
    .find(item => store.getState().user[item].email === window.user.email)
    || window.user._id;
  setCurrentUserId(id)(store.dispatch);
  if (id !== '5') {
    getCurrentUser(id === window.user._id)(store.dispatch);
    setCurrentUserId(id)(store.dispatch);
    const state = store.getState();
    const currentUser = state.user[state.appSettings.currentUserId];

    createTeam({
      _id: currentUser.personalTeam,
      type: 'Personal',
      name: `${currentUser.firstName} ${currentUser.lastName}`,
      description: 'This is my personal team',
      privacy: 'Private',
      image: currentUser.image,
      creator: currentUser._id,
      parentTeam: null,
      childTeams: [],
      openGoals: [],
      closeGoals: [],
      members: [
        {
          _id: currentUser._id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          username: currentUser.email.split('@')[0],
          role: 'admin',
          image: currentUser.image,
        },
      ],
    })(store.dispatch);

    selectTeam(currentUser.personalTeam)(store.dispatch);

    createGoal({
      _id: `${(Math.random() * 100000).toFixed()}`,
      title: 'Give Up On The Unhealthy Lifestyle',
      description: 'I\'m starting new life',
      startDate: moment().startOf('quarter'),
      endDate: moment().endOf('quarter'),
      parentTeam: currentUser.personalTeam,
      parentGoal: null,
      progress: 0,
      delta: 0,
      track: 2,
      assigners: [currentUser._id],
      totalLikesNumber: 0,
      status: 'Open',
      keyResults: [
        {
          _id: '1',
          title: 'Exercise three times a week',
          measure: {
            type: 'numeric',
            from: 0,
            to: 3 * (moment().endOf('quarter').diff(moment(), 'week')) || 3,
          },
          progress: 0,
        },
        {
          _id: '2',
          title: 'Eat healthy food every day',
          measure: {
            type: 'numeric',
            from: 0,
            to: moment().endOf('quarter').diff(moment(), 'day') || 1,
          },
          progress: 0,
        },
      ],
      labels: [],
      checkIns: [],
    })(store.dispatch);

    createGoal({
      _id: `${(Math.random() * 100000).toFixed()}`,
      title: 'Read More Books',
      description: 'Reading is very important',
      startDate: moment().startOf('quarter'),
      endDate: moment().endOf('quarter'),
      parentTeam: currentUser.personalTeam,
      parentGoal: null,
      progress: 0,
      delta: 0,
      track: 2,
      assigners: [currentUser._id],
      totalLikesNumber: 0,
      status: 'Open',
      keyResults: [
        {
          _id: '1',
          title: 'Read a book',
          measure: {
            type: 'boolean',
            from: 0,
            to: 1,
          },
          progress: 0,
        },
      ],
      labels: [],
      checkIns: [],
    })(store.dispatch);

    createGoal({
      _id: `${(Math.random() * 100000).toFixed()}`,
      title: 'Spend More Time With Friends & Family',
      description: 'Communication is a key to success',
      startDate: moment().startOf('quarter'),
      endDate: moment().endOf('quarter'),
      parentTeam: currentUser.personalTeam,
      parentGoal: null,
      progress: 0,
      delta: 0,
      track: 2,
      assigners: [currentUser._id],
      totalLikesNumber: 0,
      status: 'Open',
      keyResults: [
        {
          _id: '1',
          title: 'Meet with friends',
          measure: {
            type: 'boolean',
            from: 0,
            to: 1,
          },
          progress: 0,
        },
        {
          _id: '2',
          title: 'Phone parents once a week',
          measure: {
            type: 'numeric',
            from: 0,
            to: moment().endOf('quarter').diff(moment(), 'week') || 1,
          },
          progress: 0,
        },
      ],
      labels: [],
      checkIns: [],
    })(store.dispatch);

    const makeAStepGoal = {
      _id: `${(Math.random() * 100000).toFixed()}`,
      title: 'Make a step toward setting up your personal goals',
      description: 'We will make TakeBuddy using TakeBuddy',
      startDate: moment().startOf('quarter'),
      endDate: moment().endOf('quarter'),
      parentTeam: currentUser.personalTeam,
      parentGoal: null,
      progress: 0,
      delta: 0,
      track: 2,
      assigners: [currentUser._id],
      totalLikesNumber: 0,
      status: 'Open',
      keyResults: [
        {
          _id: '1',
          title: 'Sign up for TakeBuddy',
          measure: {
            type: 'boolean',
            from: 0,
            to: 1,
          },
          progress: 0,
        },
      ],
      labels: [],
      checkIns: [],
    };

    createGoal(makeAStepGoal)(store.dispatch);

    const firstPostId = `${(Math.random() * 100000).toFixed()}`;

    createFeedPost({
      _id: firstPostId,
      title: 'Make a step toward setting up your personal goals',
      date: moment(),
      description: 'Welcome to TakeBuddy! Get started by reviewing and setting your goals.',
      track: 0,
      likes: [],
      goalId: makeAStepGoal._id,
      keyResults: [{
        _id: '1',
        title: 'Sign up for TakeBuddy',
        measure: {
          type: 'boolean',
          from: 0,
          to: 1,
        },
        progress: 1,
        delta: 1,
      }],
      progress: 100,
      delta: 100,
      creator: {
        _id: currentUser._id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        image: currentUser.image,
      },
      status: 'Close',
    })(store.dispatch);

    const updatedGoal = {
      ...makeAStepGoal,
      keyResults: [{
        _id: '1',
        title: 'Sign up for TakeBuddy',
        measure: {
          type: 'boolean',
          from: 0,
          to: 1,
        },
        progress: 1,
      }],
      checkIns: [{
        _id: `${(Math.random() * 100000).toFixed()}`,
        description: 'Welcome to TakeBuddy! Get started by reviewing and setting your goals.',
        creator: currentUser._id,
        date: moment(),
        track: 0,
        keyResults: [{
          _id: '1',
          title: 'Sign up for TakeBuddy',
          measure: {
            type: 'boolean',
            from: 0,
            to: 1,
          },
          progress: 1,
          delta: 1,
        }],
      }],
      progress: 100,
      status: 'Close',
    };

    closeGoal(
      updatedGoal,
      currentUser.personalTeam,
    )(store.dispatch);

    setMostAppreciatedUser(findMostAppreciatedUser(store.getState()))(store.dispatch);
    setMostLovedUpdate(findMostLovedUpdate(store.getState()))(store.dispatch);
  } else {
    selectTeam(store.getState().user['5'].personalTeam)(store.dispatch);

    // накрутка лайков
    (function loop(sender) {
      const rand = Math.round(Math.random() * (3000 - 500)) + 500;
      if (sender === store.getState().user[store.getState().appSettings.currentUserId]._id) {
        loop(sender + 1);
      }

      setTimeout(() => {
        sendNotification({
          seen: false,
          type: 'like',
          title: 'Make a step toward setting up your personal goals',
          sender,
          receiver: store.getState().user[store.getState().appSettings.currentUserId]._id,
          date: moment(),
        })(store.dispatch);
        likeFeedPost({
          postId: '57313',
          userId: `${sender}`,
          goalId: '88200',
        })(store.dispatch);
        if (sender < 2) loop(sender + 1);
      }, rand);
    }(1));
  }
};
