import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrder = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://shop-revision.firebaseio.com/orders/u1.json"
      );
      if (!response.ok) {
        throw new Error("somethink went wrong");
      }
      const resData = await response.json();
      const loadedOrder = [];
      for (const key in resData) {
        loadedOrder.push(
          new Order(
            key,
            resData[key].cartItem,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({
        type: SET_ORDER,
        orders: loadedOrder,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItem, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      "https://shop-revision.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItem,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error("somethink went wrong");
    }
    const resData = await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItem,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
