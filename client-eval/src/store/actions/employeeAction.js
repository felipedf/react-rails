import * as action from './actions';
import { fetchGet, fetchDelete, fetchPost } from '../../shared/utility'

export const createEmployee = employee => (
  dispatch => (
    fetchPost(`/api/employees`, employee)
      .then(employee => dispatch({ type: action.CREATE_EMPLOYEE, employee: employee }))
      .catch(error =>{
        console.log(error)
      })
  )
)

export const updateEmployee = employee => (
  {
    type: action.UPDATE_EMPLOYEE,
    employees: employee
  }
)

export const deleteEmployees = employeesId => {
  return dispatch => (
    fetchDelete(`/api/employees/${employeesId.join(',')}`)
      .then(dispatch({ type: action.DELETE_EMPLOYEE, employeesId: employeesId }))
      .catch(error =>{
        console.log(error)
      })
  )
}

export const initEmployees = () => {
  return  dispatch => {
    fetchGet('/api/employees')
      .then(employees => {
        dispatch({ type: action.INIT_EMPLOYEES, employees: employees });
      })
      .catch(error => {
        console.log(error)
      })
  }
};
