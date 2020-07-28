import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrder = () => {
  return async (dispatch,getState) => {
    const userId = getState().auth.userId
    try {
      const response = await fetch(
        `https://shop-revision.firebaseio.com/orders/${userId}.json`
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
  return async (dispatch,getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    const date = new Date();
    const response = await fetch(
      `https://shop-revision.firebaseio.com/orders/${userId}.json?auth=${token}`,
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
