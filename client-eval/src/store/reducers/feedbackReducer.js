import * as actionTypes from '../actions/actions';

const initialState = {
  feedbacks: {}
}

const listToObjectFeedback = action => {
  const feedbacks = action.feedback
  const result = feedbacks.reduce((map, feedback) => {
    map[feedback.id] = feedback;
    return map;
  }, {});

  return result
}

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_FEEDBACK:
      return {
        ...state,
        feedbacks: listToObjectFeedback(action)
      }
    case actionTypes.UPDATE_FEEDBACK:
      return {
        ...state,
        feedbacks: {
          ...state.feedbacks,
          [action.feedback.id]: action.feedback
        }
      }
    case actionTypes.CREATE_FEEDBACK:
      return {
        ...state,
        feedbacks: {
          ...state.feedbacks,
          [action.feedback.id]: action.feedback
        }
      }
    default: return state

  }
};

export default employeeReducer;
