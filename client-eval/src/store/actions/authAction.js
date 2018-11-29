import * as action from './actions';
import { fetchGet, fetchDelete, fetchPost } from '../../shared/utility'

// const authStart = () => (
//   {
//     type: actionType.AUTH_START
//   }
// );
//
const authSuccess = user => (
  {
    type: action.AUTH_SUCCESS,
    user: user
  }
);
//
// const authFail = error => (
//   {
//     type: actionType.AUTH_FAIL,
//     error: error
//   }
// );
//
// export const logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('expirationTime');
//   localStorage.removeItem('userId');
//   return {
//     type: actionType.AUTH_LOGOUT
//   }
// }
//
// const checkAuthTimeout = expirationTime => (
//   dispatch => {
//     setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime * 1000);
//   }
// )
//
export const authCheckState = () => (
  dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.log("Not Logged in")
      // dispatch(logout());
    } else {
      dispatch(authSuccess(user));
    }
  }
)
//
// export const setAuthRedirectPath = (path = '/') => (
//   {
//     type: actionType.SET_AUTH_REDIRECT_PATH,
//     path: path
//   }
// )

export const auth = (email, password) => (
  dispatch => {
    // dispatch(authStart());
    const authData = {
      user: {
        email: email,
        password: password
      }
    };
    fetchPost('/login', authData)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(authSuccess(user));
        // dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        // dispatch(authFail(err.response.data.error.message));
      })
  }
);
