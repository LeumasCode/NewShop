import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    // 1) Dispatch the request
    dispatch({ type: USER_LOGIN_REQUEST });

    // 2) Make api request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    // 3) If request is successful, dispatch the success
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // 4) save user to localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      // if error
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => dispatch =>{
  localStorage.removeItem('userInfo')
  dispatch({type: USER_LOGOUT})
}