import * as action from './actions';
import { fetchPost } from '../../shared/utility'

const authSuccess = user => (
  {
    type: action.AUTH_SUCCESS,
    user: user
  }
);

const authFail = error => (
  {
    type: action.AUTH_FAIL,
    error: error
  }
);

export const logout = () => {
  localStorage.removeItem('user');
  return {
    type: action.AUTH_LOGOUT
  }
}

export const authCheckState = () => (
  dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.log("Not Logged in")
      dispatch(logout());
    } else {
      dispatch(authSuccess(user));
    }
  }
)

export const auth = (email, password) => (
  dispatch => {
    const authData = {
      user: {
        email: email,
        password: password
      }
    };
    fetchPost('/login', authData)
      .then(user => {
        if (user.error) {
          dispatch(authFail(user.error))
        } else {
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(authSuccess(user));
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
);
