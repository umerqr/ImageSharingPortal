const {
  DEFAULT_CONST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_USER_INFO,
} = require('./constants');

export const loginAction = (payload) => ({ type: DEFAULT_CONST, payload });
export const loginSuccess = (res) => ({ type: LOGIN_SUCCESS, res });
export const loginError = (err) => ({ type: LOGIN_ERROR, err });

export const fetchUserInfoAction = () => ({
  type: FETCH_USER_INFO,
});
export const fetchUserInfoSuccess = (res) => ({ type: LOGIN_SUCCESS, res });
