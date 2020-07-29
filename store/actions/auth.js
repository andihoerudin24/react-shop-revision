import {AsyncStorage} from 'react-native'
// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

export const authenticate = (userId,token) =>{
    return{type:AUTHENTICATE,userId:userId,token:token}
}

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
    //console.log(resData);
    dispatch(authenticate(resData.localId,resData.idToken));
    const expirationDate =new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken,resData.localId,expirationDate)
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
    //console.log(resData);
    dispatch(authenticate(resData.localId,resData.idToken));
    const expirationDate =new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken,resData.localId,expirationDate)
  };
};

export const Logout = () =>{
  AsyncStorage.removeItem('userData')
  return{
    type:LOGOUT
  }
}

const saveDataToStorage =(token,userId,expirationDate) =>{
   AsyncStorage.setItem('userData',JSON.stringify({
     token:token,
     userId:userId,
     expiryDate:expirationDate.toISOString()
   }))
}
