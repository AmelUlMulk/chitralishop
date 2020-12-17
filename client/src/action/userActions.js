import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_RESET,
  ORDER_LIST_MY_RESET,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  USER_ORDERS_SUCCESS,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_ADMIN_SUCCESS,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_RESET,
  USER_UPDATE_ADMIN_FAIL,
} from "../action/Types";

export const Register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/users",
      { name, email, password },
      config
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logOut = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_RESET,
  });
  dispatch({
    type: ORDER_LIST_MY_RESET,
  });
  dispatch({
    type: USER_LIST_RESET,
  });
  localStorage.removeItem("userInfo");
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//update profiile
export const getUsersDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/user/${id}`,

      config
    );
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//update profiile
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/user/profile`, user, config);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//const get all Users by admin
export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/user/getusers", config);
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//const get all Users by admin
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/user/${id}`, config);
    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserByAdmin = (user, reset) => async (
  dispatch,
  getState
) => {
  try {
    if (reset) {
      dispatch({
        type: USER_UPDATE_ADMIN_RESET,
      });
    } else {
      dispatch({
        type: USER_UPDATE_ADMIN_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/user/${user._id}`, user, config);
      dispatch({
        type: USER_UPDATE_ADMIN_SUCCESS,
      });
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
