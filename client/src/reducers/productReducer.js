import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_SUCCESS,
  PRODUCT_REQUEST,
  PRODUCT_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS
} from "../action/Types";
const initialState = {
  products: [],
  product: {},
  loading: true,
  error: null,
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        products: [],
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        pages:action.payload.pages,
        page:action.payload.page,
        loading: false,
      };
    case PRODUCT_LIST_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
      case PRODUCT_REQUEST: {
        return {
          ...state,
          loading: true,
        };
      }  
   case PRODUCT_SUCCESS: {
      return {
        ...state,
        product: action.payload,
        loading: false,
        success: true,
      };
    }
    
    case PRODUCT_FAIL: {
      return {
        error: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};
//
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
// Product update
export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        updateProduct: action.payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    case PRODUCT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
// Product Review 
export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,

      };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};
export const topProductReducer = (state = { products:[]}, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return {
        products: [],
        loading: true,
      };
    case PRODUCT_TOP_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };
    case PRODUCT_TOP_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
      
    default:
      return state;
  }
};
