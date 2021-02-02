import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // dispatch the request
    dispatch({ type: ORDER_CREATE_REQUEST });

    //get the user info
    const { userInfo } = getState().userLogin;

    // 2) Make api request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);

    // dispatch the success
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      // if error
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
    // dispatch the request
    dispatch({ type: ORDER_DETAILS_REQUEST });

    //get the user info
    const { userInfo } = getState().userLogin;

    // 2) Make api request
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);

    // dispatch the success
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      // if error
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    // dispatch the request
    dispatch({ type: ORDER_PAY_REQUEST });

    //get the user info
    const { userInfo } = getState().userLogin;

    // 2) Make api request
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    // dispatch the success
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      // if error
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listMyOrders = () => async (
  dispatch,
  getState
) => {
  try {
    // dispatch the request
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    //get the user info
    const { userInfo } = getState().userLogin;

    // 2) Make api request
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/orders/myorders`,
      config
    );

    // dispatch the success
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      // if error
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
