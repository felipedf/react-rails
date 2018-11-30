import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader, Header, Button, Checkbox, Icon, Table } from 'semantic-ui-react';

import * as employeeAction from '../../store/actions/employeeAction';
import * as feedbackAction from '../../store/actions/feedbackAction';
import AddEmployeeModal from './UI/AddEmployeeModal'
import PreviewEmployeeModal from './UI/PreviewEmployeeModal'

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

  getEmployee (id) {
    this.fetch(`/api/employees/${id}`)
      .then(employee => this.setState({employee: employee}))
  }

  render () {
    let {employees} = this.props

    let table = (
      <Dimmer active inverted>
        <Loader content='Loading' />
      </Dimmer>
    )

    if (employees) {
      let tableRows = employees.map( employee => (
        employee.id ?
          <Table.Row key={employee.id}>
            <Table.Cell collapsing>
              <Checkbox slider checkedemployeeid={employee.id} onClick={this.handleToggleEmployee} />
            </Table.Cell>
            <Table.Cell>{employee.name}</Table.Cell>
            <Table.Cell>{employee.created_at}</Table.Cell>
            <Table.Cell>{employee.email}</Table.Cell>
            <Table.Cell>{employee.rating.toFixed(2)}</Table.Cell>
            <Table.Cell>
              <PreviewEmployeeModal
                employees={employees}
                currentEmployee={employee}
                submitAction={this.props.onEmployeeRequestReview}
              />
            </Table.Cell>
          </Table.Row>
          : null
      ))
      table = (
        <Table celled compact definition>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Registration Date</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tableRows}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                <AddEmployeeModal submitAction={this.props.onEmployeeCreated}/>
                <Button
                   disabled={this.state.checkedEmployeesId.length === 0}
                   size='small' onClick={this.handleEmployeeRemoved}>
                     Delete
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      )
    }

    return (
      <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='unordered list' circular />
          <Header.Content>
            List of Employees
          </Header.Content>
        </Header>
        {table}
      </Container>
    )
  }
}

const mapStateToProps = state => (
  {
    employees: state.employee.employees
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
