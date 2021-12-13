import axios from "axios";
import {
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CREATE_ORDER_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };
    const { data } = await axios.post("/api/orders", order, config);
    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CREATE_ORDER_FAIL", error: error.message });
  }
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, error: error.message });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    console.log(data);

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, error: error.message });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_MY_FAIL, error: error.message });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const config = {
      headers: {
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, error: error.message });
  }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVERED_REQUEST,
    });

    const config = {
      headers: {
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };

    const { data } = await axios.put(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DELIVERED_FAIL, error: error.message });
  }
};
