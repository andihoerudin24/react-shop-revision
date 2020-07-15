import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const Prodprice = addedProduct.price;
      const prodTitle = addedProduct.title;
      //console.log(state.items[addedProduct.id])
      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          Prodprice,
          prodTitle,
          state.items[addedProduct.id].sum + Prodprice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, Prodprice, prodTitle, Prodprice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + Prodprice,
      };
  }
  return state;
};
