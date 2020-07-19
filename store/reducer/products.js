import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";
const intialState = {
  avaliableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = intialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        avaliableProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
  }
  return state;
};
