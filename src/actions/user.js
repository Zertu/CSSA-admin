import axios from "axios";
import { get, post, put, deleteReq } from ".";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const CREATE_USER_INITIAL = "CREATE_USER_INITIAL";
export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

function createUserInitial() {
  return {
    type: CREATE_USER_INITIAL,
    isFetching: false,
  };
}

function requestCreateUser(user) {
  return {
    type: CREATE_USER_REQUEST,
    isFetching: true,
    user,
  };
}

function createUserSuccess(user) {
  return {
    type: CREATE_USER_SUCCESS,
    isFetching: false,
    user,
  };
}

function createUserError(message) {
  return {
    type: CREATE_USER_FAILURE,
    isFetching: false,
    message,
  };
}

function requestFetchUsers() {
  return {
    type: FETCH_USERS_REQUEST,
    isFetching: true,
  };
}

function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    isFetching: false,
    users,
  };
}

function fetchUsersError(message) {
  return {
    type: FETCH_USERS_FAILURE,
    isFetching: false,
    message,
  };
}

export function resetUser(data) {
  return async (dispatch) => {
    const response = await post(`users/reset`, data);

    if (!response) {
      dispatch(createUserError(response.user_name));
      return Promise.reject("User failed to delete");
    }
    dispatch(createUserSuccess("User deleted successfully"));
    setTimeout(() => {
      dispatch(createUserInitial());
    }, 5000);
    return Promise.resolve("User deleted successfully");
  };
}
export function deleteUser(data) {
  return async (dispatch) => {
    const response = await deleteReq(`users/${data.id}`, data);

    if (!response) {
      dispatch(createUserError(response.user_name));
      return Promise.reject("User failed to delete");
    }
    dispatch(createUserSuccess("User deleted successfully"));
    setTimeout(() => {
      dispatch(createUserInitial());
    }, 5000);
    return Promise.resolve("User deleted successfully");
  };
}

export function updateUser(data) {
  return async (dispatch) => {
    dispatch(requestCreateUser(data));
    const response = await put(`users/${data.id}`, data);

    if (!response) {
      dispatch(createUserError(response.user_name));
      return Promise.reject("User failed to update");
    }
    dispatch(createUserSuccess("User updated successfully"));
    setTimeout(() => {
      dispatch(createUserInitial());
    }, 5000);
    return Promise.resolve("User updated successfully");
  };
}

export function createUser(userData) {
  return async (dispatch) => {
    dispatch(requestCreateUser(userData));
    const response = await post("users", userData);

    if (!response) {
      dispatch(createUserError(response.user_name));
      return Promise.reject("User failed to create");
    }
    dispatch(createUserSuccess("User created successfully"));
    setTimeout(() => {
      dispatch(createUserInitial());
    }, 5000);
    return Promise.resolve("User created successfully");
  };
}

export function fetchUsers(id = "") {
  return async (dispatch) => {
    dispatch(requestFetchUsers());
    const users = await get(`${id ? `users/${id}` : "users"}`);
    if (!users) {
      dispatch(fetchUsersError(users.message));
      return Promise.reject(users);
    }
    dispatch(fetchUsersSuccess(users));
    return Promise.resolve(users);
  };
}

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function receiveLogin(token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: token,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("token");
    document.cookie = "id_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  const config = {
    username: creds.username,
    password: creds.password,
  };

  return async (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(config));
    const response = await post("users/login", config);
    const token = response.data.token;
    dispatch(receiveLogin(token));
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    if (!response) {
      // If there was a problem, we want to
      // dispatch the error condition
      dispatch(loginError(response));
      return Promise.reject("Login failed");
    }
    return Promise.resolve("Login successfully");
  };
}
