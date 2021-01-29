import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // check if the product exist
      const existItem = state.cartItems.find((x) => x.product === item.product);

      // if it exist
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // else add the item to the cartItems
        return {
          ...state,

          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
};
