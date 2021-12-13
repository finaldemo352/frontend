import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_GET_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
const userReducer = (
  state = { userInfo: {}, error: null, loading: false },
  action
) => {
  switch (action.type) {
    case "ADD_USER_REQUEST":
      return { ...state, loading: true };
    case "ADD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };
    case "ADD_USER_FAIL":
      return { ...state, loading: false, error: action.error };
    case "REMOVE_USER_REQUEST":
      return { ...state, userInfo: {} };
    default:
      return state;
  }
};

const profileGetReducer = (state = { profileInfo: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        profileInfo: action.payload,
      };
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.error };
    case "PROFILE_RESET":
      return { profileInfo: {} };

    default:
      return state;
  }
};

const updateUserReducer = (state = { profileInfo: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case USER_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.error };

    default:
      return state;
  }
};

const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_FAIL:
      return { loading: false, error: action.error };
    case "USERS_RESET":
      return { users: [], loading: false, error: null };

    default:
      return state;
  }
};

const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

const userGetReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_GET_REQUEST:
      return { loading: true };
    case USER_GET_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_GET_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

const userUpdateReducer = (state = { loading: false, error: null }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};
export {
  userReducer,
  updateUserReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userGetReducer,
  profileGetReducer,
};
