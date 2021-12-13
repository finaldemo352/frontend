import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";
export const getProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_LIST_REQUEST" });
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      if (!data) {
        throw new Error("No Products found");
      }
      console.log(data);
      dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "PRODUCT_LIST_FAIL", error: error.message });
    }
  };

export const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });
    const { data } = await axios.get(`/api/products/top`);

    if (!data) {
      throw new Error("No Products found");
    }
    console.log(data);
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_TOP_FAIL, error: error.message });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_SINGLE_REQUEST" });
    const product = await axios.get(`/api/products/${id}`);

    if (!product) {
      throw new Error("No Product found");
    }
    dispatch({ type: "PRODUCT_SINGLE_SUCCESS", payload: product });
  } catch (error) {
    dispatch({ type: "PRODUCT_SINGLE_FAIL", error: error.message });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };
    const { data } = await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, error: error.message });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + getState().user.userInfo.token,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, error: error.message });
  }
};

export const updateProduct =
  ({ id, updateData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + getState().user.userInfo.token,
        },
      };
      const { data } = await axios.put(
        `/api/products/${id}`,
        updateData,
        config
      );

      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_UPDATE_FAIL, error: error.message });
    }
  };

export const reviewProduct =
  ({ id, updateData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + getState().user.userInfo.token,
        },
      };
      console.log(id, updateData);
      const { data } = await axios.post(
        `/api/products/${id}/review`,
        updateData,
        config
      );

      dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_REVIEW_FAIL, error: error.message });
    }
  };
