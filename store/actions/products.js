import Product from "../../models/product";
import * as Notivication from 'expo-notifications'
import * as Permissions from 'expo-permissions'

export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProduct = () => {
  return async (dispatch,getState) => {
    const userId = getState().auth.userId
//    console.log(userId)
    try {
      const response = await fetch(
        "https://shop-revision.firebaseio.com/products.json"
      );
      //console.log(response.json())
      if (!response.ok) {
        throw new Error("Somethink Went Wrong");
      }
      const resData = await response.json();
      //console.log('res',resData)
      const loadedProduct = [];
      for (const key in resData) {
        loadedProduct.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].ownerPushToken,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      console.log(loadedProduct.filter(prod => prod.ownerId === userId))
      dispatch({
        type: SET_PRODUCT,
        products: loadedProduct,
        userProducts:loadedProduct.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch,getState) => {
    const token = getState().auth.token
    const response = await fetch(
      `https://shop-revision.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Somethink Went Wrong!");
    }
    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch,getState) => {
    let pushtoken;
    let statusObj=await Permissions.getAsync(Permissions.NOTIFICATIONS)
    if(statusObj.status !== 'granted'){
       statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    }
    if(statusObj.status !== 'granted'){
        pushtoken = null
    }else{
        pushtoken = (await Notivication.getExpoPushTokenAsync()).data
    }
    console.log('pushtoken',pushtoken)
    const token = getState().auth.token
    const userId = getState().auth.userId
    const response = await fetch(
      `https://shop-revision.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId:userId,
          ownerPushToken:pushtoken
        }),
      }
    );
    const resData = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId:userId,
        pushtoken:pushtoken
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch,getState) => {
    const token = getState().auth.token
    const response = await fetch(
      `https://shop-revision.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Somethink Went Wrong");
    }
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
