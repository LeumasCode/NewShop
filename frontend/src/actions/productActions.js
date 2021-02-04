import axios from "axios";
import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    // dispatch the request action first
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // Make the request
    const { data } = await axios.get("/api/products");

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
    dispatch({ type: PRODUCT_DELETE_SUCCESS});
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
