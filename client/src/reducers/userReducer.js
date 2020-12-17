import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_LOGOUT,
  USER_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_SUCCESS,
  USER_UPDATE_ADMIN_RESET,
} from "../action/Types";
const initialState = {};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const userDetailReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_RESET:
      return {
        user: {},
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_RESET:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LIST_RESET:
      return {
        loading: false,
        users: [],
      };

    default:
      return state;
  }
};
//deleting a request
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
//Updating a user by admin
//deleting a request
export const userUpdateByAdminReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_ADMIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };
    case USER_UPDATE_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_ADMIN_RESET: {
      return {
        loading: false,
        user: {},
      };
    }

    default:
      return state;
  }
};
