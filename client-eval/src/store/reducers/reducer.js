import * as actionTypes from '../actions/actions';

const initialState = {
  employees: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EMPLOYEE:
      return {
        ...state,
        employees: [
          ...state.employees,
          action.targetEmployee
        ]
      }
    case actionTypes.DELETE_EMPLOYEE:
      console.log("AAAAHAHIAIIAAA")
      return {
        ...state,
        employees: state.employees.filter(employee => employee.email !== action.targetEmployee.email )
      }
    case actionTypes.UPDATE_EMPLOYEE:
      return {

      }
    default: return state

  }
};

export default reducer;
