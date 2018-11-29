import * as actionTypes from '../actions/actions';

const initialState = {
  feedback: []
}

const updateFeedback = (state, action) => {
  const feedbacks = state.feedback
  const newFeedback = action.feedback
  return feedbacks.map(f => {
    if (f.id === newFeedback.id) {
      f = { ...f, rating: newFeedback.rating, peding: newFeedback.pending };
    }
    return f;
  });
}

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_FEEDBACK:
      return {
        ...state,
        feedback: [
          ...state.feedback,
          ...action.feedback
        ]
      }
    case actionTypes.UPDATE_FEEDBACK:
      return {
        ...state,
        feedback: updateFeedback(state, action)
      }
    default: return state

  }
};

export default employeeReducer;
