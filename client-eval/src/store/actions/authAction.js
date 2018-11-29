import * as action from './actions';
import { fetchGet, fetchDelete, fetchPost } from '../../shared/utility'

// const authStart = () => (
//   {
//     type: actionType.AUTH_START
//   }
// );
//
// const authSuccess = (token, userId) => (
//   {
//     type: actionType.AUTH_SUCCESS,
//     token: token,
//     userId: userId
//   }
// );
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
// export const authCheckState = () => (
//   dispatch => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       dispatch(logout());
//     } else {
//       const expirationTime = new Date(localStorage.getItem('expirationTime'));
//       if (expirationTime > new Date()) {
//         const userId = localStorage.getItem('userId');
//         dispatch(authSuccess(token, userId));
//         dispatch(checkAuthTimeout( (expirationTime.getTime() - new Date().getTime()) / 1000 ));
//       } else {
//         dispatch(logout());
//       }
//     }
//   }
// )
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
      .then(response => {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(response)
        // localStorage.setItem('userId', response.data.localId);
        // localStorage.setItem('token', response.data.idToken);
        // localStorage.setItem('expirationTime', expirationTime);
        // dispatch(authSuccess(response.data.idToken, response.data.localId));
        // dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        // dispatch(authFail(err.response.data.error.message));
      })
  }
);
