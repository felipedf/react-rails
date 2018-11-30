import * as actionType from '../actions/actions';

const initialState = {
  user: null,
  error: null
};

const authSuccess = (state, action) => (
  {
    ...state,
    user: action.user,
    error: null
  }
)

const authFail = (state, action) => (
  {
    ...state,
    error: action.error
  }
)

const authLogout = (state, action) => (
  {
    ...state,
    user: null
  }
);

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_SUCCESS: return authSuccess(state, action);
    case actionType.AUTH_FAIL: return authFail(state, action);
    case actionType.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
};

export default authReducer;
