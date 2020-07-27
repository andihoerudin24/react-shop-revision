export const SIGNUP = "SIGNUP";

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
      throw new Error("Somethink went wrong");
    }
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: SIGNUP,
    });
  };
};
