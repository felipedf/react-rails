import * as actionTypes from '../actions/actions';

const initialState = {
  employees: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_EMPLOYEES:
      return {
        ...state,
        employees: [
          ...state.employees,
          ...action.employees
        ]
      }
    case actionTypes.CREATE_EMPLOYEE:
      return {
        ...state,
        employees: [
          ...state.employees,
          action.employee
        ]
      }
    case actionTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(employee => (
          !action.employeesId.some(checkedEmployeeId => employee.id === checkedEmployeeId)
        ))
      }
    case actionTypes.UPDATE_EMPLOYEE:
      return {

      }
    default: return state

  }
};

export default reducer;
