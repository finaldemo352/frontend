export const cartReducer = (
  state = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "",
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "CART_ADD_REQUEST":
      return { ...state, loading: true };
    case "CART_ADD_SUCCESS":
      const recieved = action.payload;
      const isExists = state.cartItems.find(
        (item) => item.name === recieved.name
      );

      if (isExists) {
        return {
          ...state,
          loading: false,
          cartItems: state.cartItems.map((x) =>
            x.name == recieved.name ? recieved : x
          ),
        };
      }

      return {
        ...state,
        loading: false,

        cartItems: [...state.cartItems, recieved],
      };

    case "CART_ADD_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "CART_REMOVE_REQUEST":
      return { ...state, loading: true };

    case "CART_REMOVE_SUCCESS":
      const modified = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      return {
        ...state,
        cartItems: modified,
        loading: false,
      };
    case "CART_REMOVE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "ADD_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case "ADD_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case "RESET_CART":
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "",
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
