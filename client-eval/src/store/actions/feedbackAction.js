import * as action from './actions';
import { fetchGet, fetchPut, fetchPost } from '../../shared/utility'

export const initFeedback = userId => {
  return  dispatch => {
    fetchGet(`/api/employees/${userId}/feedbacks`)
      .then(feedback => {
        dispatch({ type: action.INIT_FEEDBACK, feedback: feedback });
      })
      .catch(error => {
        console.log(error)
      })
  }
};


export const updateFeedback = (feedbackId, rating) => {
  return  dispatch => {
    fetchPut(`/api/feedbacks/${feedbackId}`, rating)
      .then(feedback => {
        dispatch({ type: action.UPDATE_FEEDBACK, feedback: feedback });
      })
      .catch(error => {
        console.log(error)
      })
  }
};

export const createFeedback = (currentEmployeeId, reviewedEmployeeId) => {
  const body = {
    feedback: {
      owner_id: currentEmployeeId,
      rated_user_id: reviewedEmployeeId
    }
  }
  return  dispatch => {
    fetchPost('/api/feedbacks', body)
      .then(feedback => {
        dispatch({ type: action.CREATE_FEEDBACK, feedback: feedback });
      })
      .catch(error => {
        console.log(error)
      })
  }
};
