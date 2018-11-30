import React from 'react';
import { Checkbox, Button, Table } from 'semantic-ui-react';

import AddEmployeeModal from './AddEmployeeModal/AddEmployeeModal';
import PreviewEmployeeModal from './PreviewEmployeeModal/PreviewEmployeeModal';

const employeeTableData = props => {
  let tableRows = props.employees.map( employee => (
    employee.id ?
      <Table.Row key={employee.id}>
        <Table.Cell collapsing>
          <Checkbox slider checkedemployeeid={employee.id} onClick={props.toggleEmployeeAction} />
        </Table.Cell>
        <Table.Cell>{employee.name}</Table.Cell>
        <Table.Cell>{employee.created_at}</Table.Cell>
        <Table.Cell>{employee.email}</Table.Cell>
        <Table.Cell>{employee.rating.toFixed(2)}</Table.Cell>
        <Table.Cell>
          <PreviewEmployeeModal
            employees={props.employees}
            currentEmployee={employee}
            submitAction={props.requestReviewAction}
          />
        </Table.Cell>
      </Table.Row>
      : null
  ))

  return (
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
            <AddEmployeeModal submitAction={props.employeeCreateAction}/>
            <Button
               disabled={props.isDisabled}
               size='small' onClick={props.removeEmployeeAction}>
                 Delete
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default employeeTableData;
