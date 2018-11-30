import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader, Header, Icon, Message} from 'semantic-ui-react';

import * as employeeAction from '../../store/actions/employeeAction';
import * as feedbackAction from '../../store/actions/feedbackAction';
import EmployeeTableData from './EmployeeTableData/EmployeeTableData'

class Admin extends Component {
  state = {
    checkedEmployeesId: []
  }

  componentDidMount () {
    this.props.onInitEmployees()
  }

  handleEmployeeRemoved = () => {
    this.props.onEmployeeDeleted(this.state.checkedEmployeesId);
    this.setState({
      ...this.state,
      checkedEmployeesId: []
    })
  }

  handleToggleEmployee = (e, result) => {
    const {checked, checkedemployeeid} = result
    if (checked) {
      this.setState({
        ...this.state,
        checkedEmployeesId: [
          ...this.state.checkedEmployeesId,
          checkedemployeeid
        ]
      })
    } else {
      const currentEmployees = this.state.checkedEmployeesId.filter(employeeId => (
        employeeId !== checkedemployeeid
      ))

      this.setState({
        ...this.state,
        checkedEmployeesId: currentEmployees
      })
    }
  }

  render () {
    let {employees} = this.props

    let table = (
      <Dimmer active inverted>
        <Loader content='Loading' />
      </Dimmer>
    )

    if (employees) {
      table = (
        <EmployeeTableData
          requestReviewAction={this.props.onEmployeeRequestReview}
          toggleEmployeeAction={this.handleToggleEmployee}
          removeEmployeeAction={this.handleEmployeeRemoved}
          employeeCreateAction={this.props.onEmployeeCreated}
          isDisabled={this.state.checkedEmployeesId.length === 0}
          employees={employees}
        />
      )
    }

    let errorMessage = this.props.error
      ? <Message error header={this.props.error}/>
      : null

    return (
      <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='unordered list' circular />
          <Header.Content>
            List of Employees
          </Header.Content>
        </Header>
        {errorMessage}
        {table}
      </Container>
    )
  }
}

const mapStateToProps = state => (
  {
    employees: state.employee.employees,
    error: state.employee.error
  }
)

const mapDispatchToProps = dispatch => (
  {
    onInitEmployees: () => dispatch(employeeAction.initEmployees()),
    onEmployeeCreated: (employee) => dispatch(employeeAction.createEmployee(employee)),
    onEmployeeDeleted: (employees) => dispatch(employeeAction.deleteEmployees(employees)),
    onEmployeeUpdated: (employee) => dispatch(employeeAction.updateEmployee(employee)),
    onEmployeeRequestReview: (currentEmployeeId, reviewedEmployeeId) => dispatch(feedbackAction.createFeedback(currentEmployeeId, reviewedEmployeeId))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
