import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

export const listProducts = (keyword='', pageNumber='') => async (dispatch) => {
  try {
    // dispatch the request action first
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // Make the request
    const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
 
    // If successful dispatch success
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    // if it fails dispatch fail

    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    // DISPATCH THE REQUEST
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // GET A SINGLE PRODUCT FROM ID
    const { data } = await axios.get(`/api/products/${id}`);

    // if successful, dispatch success
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    //if error
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    // DISPATCH THE REQUEST
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // DELETE A SINGLE PRODUCT delete ID
    await axios.delete(`/api/products/${id}`, config);

    // if successful, dispatch success
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    //if error
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    // DISPATCH THE REQUEST
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // CREATE A SINGLE PRODUCT
    const { data } = await axios.post(`/api/products`, {}, config);

    // if successful, dispatch success
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    //if error
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    // DISPATCH THE REQUEST
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // UPDATE A SINGLE PRODUCT
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    // if successful, dispatch success
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    //if error
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    const { userInfo } = getState().userLogin;
    // DISPATCH THE REQUEST
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // CREATE_REVIEW A SINGLE PRODUCT
    await axios.post(`/api/products/${productId}/reviews`, review, config);

    // if successful, dispatch success
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    //if error
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
