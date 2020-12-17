import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  USER_ORDERS_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAIL,
  ORDER_LIST_MY_RESET,
  ORDERS_REQUEST,ORDERS_FAIL,ORDERS_SUCCESS,
  ORDER_UPDATE_REQUEST,ORDER_UPDATE_FAIL,ORDER_UPDATE_SUCCESS
} from "../action/Types";

const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const orderDetailReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const UserOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case USER_ORDERS_SUCCESS: {
      return {
        orders: action.payload,
        loading: false,
      };
    }
    case USER_ORDERS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    case ORDER_LIST_MY_RESET: {
      return {
        orders: [],
      };
    }
    default:
      return state;
  }
};
//
export const OrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_REQUEST:
      return {
        loading: true,
      };
    case ORDERS_SUCCESS: {
      return {
        orders: action.payload,
        loading: false,
      };
    }
    case ORDERS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    case ORDER_LIST_MY_RESET: {
      return {
        orders: [],
      };
    }
    default:
      return state;
  }
};
export const OrderUpdateReducer = (state = { order:{}}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_UPDATE_SUCCESS: {
      return {
        order: action.payload,
        loading: false,
      };
    }
    case ORDER_UPDATE_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    case ORDER_LIST_MY_RESET: {
      return {
        orders: [],
      };
    }
    default:
      return state;
  }
};

export default orderCreateReducer;
