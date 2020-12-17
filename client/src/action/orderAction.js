import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAIL,
  ORDERS_REQUEST,ORDERS_SUCCESS,ORDERS_FAIL,
  ORDER_UPDATE_REQUEST,ORDER_UPDATE_SUCCESS,ORDER_UPDATE_FAIL
} from "./Types";
import axios from "axios";
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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
    const { data } = await axios.post(`/api/order`, order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAIL_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/order/${id}`, config);
    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDERS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/order/orders", config);
    console.log("this is data", data);
    dispatch({
      type: USER_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//Get All Orders By Admin
export const getAllUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDERS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/order", config);
    
    dispatch({
      type: ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//Update Order By Admin
export const updateOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/order/${id}`,{},config);
    
    dispatch({
      type: ORDER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
