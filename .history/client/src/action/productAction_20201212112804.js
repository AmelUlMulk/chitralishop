import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_REQUEST,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_SUCCESS
} from "../action/Types";
export const getProducts = (key='',pageNumber='') => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const res = await axios.get(`/api/products?key=${key}&pageNumber=${pageNumber}`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getTopProducts = ( )=> async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_TOP_REQUEST,
    });
    const res = await axios.get(`/api/products/top`);
    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_REQUEST,
    });
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product, reset) => async (dispatch, getState) => {
  try {
    if (reset) {
      dispatch({
        type: PRODUCT_CREATE_RESET,
      });
    } else {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/products`, product, config);
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//Updating Product
export const updateProduct = (product, reset) => async (dispatch, getState) => {
  try {
    if (reset) {
      dispatch({
        type: PRODUCT_UPDATE_RESET,
      });
    } else {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
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
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const productCreateReview = (productId, review,reset) => async (dispatch, getState) => {
  try {
    if (reset) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      });
    } else {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
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
       await axios.post(
        `/api/products/${productId}/reviews `,
        review,
        config
      );
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
