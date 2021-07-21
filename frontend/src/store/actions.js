import axios from "axios";
import * as actionTypes from "./actionTypes";

import {customAxios, loginURL, registerURL, userDetailURL} from '../axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, user = {}) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const slotUpdated = (slot) => {
  return {
    type: actionTypes.SLOT_SET,
    slot:slot
  };
};

export const accountTypeSet = (account_type) => {
  return {
    type: actionTypes.ACCOUNT_TYPE_SET,
    account_type:account_type
  };
};

export const profileUpdated = (user = {}) => {
  return {
    type: actionTypes.PROFILE_UPDATED,
    user,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(loginURL, {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        // dispatch(authGetDetails(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(registerURL, {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        // dispatch(authGetDetails(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(authGetDetails(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};


// PROFILE FUNCTIONS
export const authGetDetails = (token) => {
  return dispatch => {
    dispatch(authStart());
    axios.get(userDetailURL, { headers: { Authorization: `Token ${token}` } })
      .then(res => {
        dispatch(profileUpdated(res.data));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authUpdateDetails = (data) => {
  return dispatch => {
    dispatch(authStart());
    customAxios.put(userDetailURL, data)
      .then(res => {
        dispatch(profileUpdated(res.data));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authDeleteAccount = (token) => {
  return dispatch => {
    dispatch(authStart());
    customAxios.delete(userDetailURL)
      .then(res => {
        // console.log(res)
        dispatch(authSuccess(token));
        dispatch(logout())
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const setSlot = (slot,token) => {
  return dispatch => {
    dispatch(authStart());
    dispatch(slotUpdated(slot));
    
    if(slot==="") {dispatch(accountTypeSet("user"))}
    else {dispatch(accountTypeSet("parkapp"));}
    
    dispatch(authSuccess(token));
    ;
  };
};

export const setAccountType = (type, token) => {
  console.log(token)
  return dispatch => {
    dispatch(authStart());
    dispatch(accountTypeSet(type));
    dispatch(authSuccess(token));
    ;
  };
};