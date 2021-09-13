const {
  FETCH_LIST_DATA_SUCCESS,
  FETCH_LIST_DATA_ERROR,
  FETCH_LIST_DATA,
  FETCH_USER_LIST_DATA_SUCCESS,
  FETCH_USER_LIST_DATA,
  FETCH_USER_LIST_DATA_ERROR,
  POST_USER_LIST_DATA,
  POST_USER_LIST_DATA_SUCCESS,
  POST_USER_LIST_DATA_ERROR,
} = require('./constants');

export const fetchListDataAction = () => ({ type: FETCH_LIST_DATA });
export const fetchListDataSuccess = (res) => ({
  type: FETCH_LIST_DATA_SUCCESS,
  res,
});
export const fetchListDataError = (err) => ({
  type: FETCH_LIST_DATA_ERROR,
  err,
});

export const fetchUserListDataAction = () => ({ type: FETCH_USER_LIST_DATA });
export const fetchUserListDataSuccess = (res) => ({
  type: FETCH_USER_LIST_DATA_SUCCESS,
  res,
});
export const fetchUserListDataError = (err) => ({
  type: FETCH_USER_LIST_DATA_ERROR,
  err,
});

export const postListDataAction = (payload) => ({
  type: POST_USER_LIST_DATA,
  payload,
});
export const postListDataSuccess = (res) => ({
  type: POST_USER_LIST_DATA_SUCCESS,
  res,
});
export const postListDataError = (err) => ({
  type: POST_USER_LIST_DATA_ERROR,
  err,
});
