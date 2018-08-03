import Joi from 'joi-browser';
import _isEmpty from 'lodash/isEmpty';

import { validate, validateField } from 'helpers/validation';

import * as api from './user.api';

const schema = {
  firstName: Joi.string()
    .trim()
    .options({
      language: {
        any: { empty: '!!Your first name must be longer then 1 letter' },
      },
    }),
  lastName: Joi.string()
    .trim()
    .options({
      language: {
        any: { empty: '!!Your last name must be longer then 1 letter' },
      },
    }),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .trim()
    .lowercase()
    .options({
      language: {
        string: { email: '!!Please enter a valid email address' },
        any: { empty: '!!Email is required' },
      },
    }),
};


export const validateUserField = (data, field) => {
  return validateField(data, field, schema);
};

export const validateUser = (data) => {
  const result = validate(data, schema);
  const isValid = _isEmpty(result.errors);

  return {
    errors: {
      ...result.errors,
      global: 'Validation Error.',
    },
    isValid,
  };
};

export const createUser = payload => dispatch => dispatch({ type: 'CREATE_USER', payload });

export const addTeamToCurrentUser = payload => dispatch =>
  dispatch({ type: 'ADD_TEAM_TO_CURRENT_USER', payload });

export const updateUser = (payload, _id) => async (dispatch) => {
  const user = await api.updateUser(payload);
  dispatch({ type: 'UPDATE_USER', payload: { ...user, _id } });
  dispatch({
    type: 'EDIT_TEAM',
    payload: {
      teamId: user.personalTeam,
      name: `${user.firstName} ${user.lastName}`,
      image: user.image,
    },
  });
};

export const getCurrentUser = isNew => dispatch => dispatch({
  type: 'GET_CURRENT_USER',
  payload: ({
    user: window.user,
    teamId: `${(Math.random() * 100000).toFixed()}`,
    isNew,
  }),
});

export const showNotification = _id => dispatch => dispatch({ type: 'SHOW_NOTIFICATIONS', payload: { _id } });

export const sendNotification = payload => dispatch => dispatch({ type: 'SEND_NOTIFICATION', payload });
