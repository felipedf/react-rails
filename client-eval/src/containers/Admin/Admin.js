import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader, Button, Checkbox, Icon, Table } from 'semantic-ui-react';

import * as actionTypes from '../../store/actions/actions';

class Admin extends Component {
  state = {
    checkedEmployees: []
  }

  componentDidMount () {
    this.getEmployees()
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getEmployees = () => {
    this.fetch('/api/employees')
      .then(employees => {
        if (employees.length) {
          this.setState({employees: employees})
          this.getEmployee(employees[0].id)
        } else {
          this.setState({employees: []})
        }
      })
  }

  handleEmployeeRemoved = (event, result) => {
    console.log(result.value)
  }

  handleToggleEmployee = (e, result) => {
    const {checked, checkedemployee} = result
    if (checked) {
      this.setState({
        ...this.state,
        checkedEmployees: [
          ...this.state.checkedEmployees,
          checkedemployee
        ]
      })
    } else {
      const currentEmployees = this.state.checkedEmployees.filter(employee => (
        employee.id !== checkedemployee.id
      ))

      this.setState({
        ...this.state,
        checkedEmployees: currentEmployees
      })
    }
  }

  getEmployee (id) {
    this.fetch(`/api/employees/${id}`)
      .then(employee => this.setState({employee: employee}))
  }

  render () {
    let {employees} = this.state

    let table = (
      <Dimmer active inverted>
        <Loader content='Loading' />
      </Dimmer>
    )

    if (employees) {
      let table_rows = employees.map( employee => (
        <Table.Row key={employee.id}>
          <Table.Cell collapsing>
            <Checkbox slider checkedemployee={employee} onClick={this.handleToggleEmployee} />
          </Table.Cell>
          <Table.Cell>{employee.name}</Table.Cell>
          <Table.Cell>{employee.created_at}</Table.Cell>
          <Table.Cell>{employee.email}</Table.Cell>
          <Table.Cell>No</Table.Cell>
        </Table.Row>
      ))
      table = (
        <Table celled compact definition>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Registration Date</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>CRUD</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {table_rows}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                <Button floated='right' icon labelPosition='left' primary size='small'>
                  <Icon name='user' /> Add Employee
                </Button>
                <Button size='small' onClick={this.handleEmployeeRemoved}>Delete</Button>
                <Button disabled size='small'>
                  Delete All
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      )
    }

    return (
      <Container text>
        {table}
      </Container>
    )
  }
}

const mapStateToProps = state => (
  {
    employees: state.employees
  }
)

const mapDispatchToProps = dispatch => (
  {
    onEmployeeCreated: (employee) => dispatch({type: actionTypes.CREATE_EMPLOYEE}),
    onEmployeeRemoved: (employees) => dispatch({type: actionTypes.DELETE_EMPLOYEE}),
    onEmployeeUpdated: (employee) => dispatch({type: actionTypes.UPDATE_EMPLOYEE}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
