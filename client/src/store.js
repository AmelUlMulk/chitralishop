import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,topProductReducer
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import orderCreateReducer from "./reducers/orderReducer";
import { orderDetailReducer } from "./reducers/orderReducer";
import { UserOrdersReducer,OrdersReducer,OrderUpdateReducer} from "./reducers/orderReducer";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateByAdminReducer,
  
} from "./reducers/userReducer";

const middleware = [thunk];
const reducer = combineReducers({
  productList: productReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  order: orderCreateReducer,
  orderDetail: orderDetailReducer,
  userOrders: UserOrdersReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateByAdmin: userUpdateByAdminReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  Orders:OrdersReducer,
  OrderUpdate:OrderUpdateReducer,
  Reviews:productReviewCreateReducer,
  TopProducts:topProductReducer
});
const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userItemFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;
const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAddressFromLocalStorage
      ? shippingAddressFromLocalStorage
      : {},
  },
  userLogin: { userInfo: userItemFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
