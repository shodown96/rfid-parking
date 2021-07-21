import * as actionTypes from "./actionTypes";
import { updateObject } from "./utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  user: {},
  slot:"",
  account_type:""
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const profileUpdated = (state, action) => {
  return updateObject(state, {
    user: action.user,
    error: null,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    user: {}
  });
};

const slotSet = (state, action) => {
  return updateObject(state, {
    slot:action.slot
  });
};

const accountTypeSet = (state, action) => {
  return updateObject(state, {
    account_type:action.account_type
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.PROFILE_UPDATED:
      return profileUpdated(state, action)
    case actionTypes.SLOT_SET:
      return slotSet(state, action);
    case actionTypes.ACCOUNT_TYPE_SET:
      return accountTypeSet(state, action);
    default:
      return state;
  }
};

export default reducer;
