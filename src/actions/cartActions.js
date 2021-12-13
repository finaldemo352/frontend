import axios from "axios";

export const cartAddAction =
  ({ id, qty = 1 }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CART_ADD_REQUEST" });

      const { data: product } = await axios.get(`/api/products/${id}`);

      if (!product) {
        throw new Error("No Product found");
      }

      const temp = {
        ...product,
        qty: Number(qty),
      };
      dispatch({ type: "CART_ADD_SUCCESS", payload: temp });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      dispatch({ type: "CART_ADD_FAIL", error: error.message });
      console.log(error);
    }
  };
export const cartRemoveAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CART_REMOVE_REQUEST" });

      dispatch({ type: "CART_REMOVE_SUCCESS", payload: id });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      dispatch({ type: "CART_REMOVE_FAIL", error: error.message });
    }
  };

export const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_SHIPPING_ADDRESS", payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
export const savePaymentMethod = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_PAYMENT_METHOD", payload: data });
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
