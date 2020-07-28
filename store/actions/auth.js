export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2y_mJ32Z25Bgf3m3CHMGwc_ThhhZ9598",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const errorResData = await response.json()
       const errorId = errorResData.error.message
       let message
       if(errorId === 'EMAIL_EXISTS'){
          message = 'This email exists already'
       }
       throw new Error(message)
    }
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: SIGNUP,
      token:resData.idToken,
      userId:resData.localId
    });
  };
};



export const Login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2y_mJ32Z25Bgf3m3CHMGwc_ThhhZ9598",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
       const errorResData = await response.json()
       const errorId = errorResData.error.message
       let message
       if(errorId === 'EMAIL_NOT_FOUND'){
          message = 'This email could not be found'
       }else if(errorId === 'INVALID_PASSWORD'){
         message  = 'This Password Not Valid'
       }
       throw new Error(message)
    }
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: LOGIN,
      token:resData.idToken,
      userId:resData.localId
    });
  };
};
