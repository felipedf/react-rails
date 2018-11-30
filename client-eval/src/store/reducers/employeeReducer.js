import * as actionTypes from '../actions/actions';

const initialState = {
  employees: [],
  error: null
}

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_EMPLOYEES:
      return {
        ...state,
        error: null,
        employees: action.employees
      }
    case actionTypes.CREATE_EMPLOYEE:
      return {
        ...state,
        error: null,
        employees: [
          ...state.employees,
          action.employee
        ]
      }
    case actionTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        error: null,
        employees: state.employees.filter(employee => (
          !action.employeesId.some(checkedEmployeeId => employee.id === checkedEmployeeId)
        ))
      }
    case actionTypes.CREATE_FAIL:
      return {
        ...state,
        error: action.error
      }
    default: return state

  }
};

export default employeeReducer;
