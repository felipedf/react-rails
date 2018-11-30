import React from 'react';
import { Table } from 'semantic-ui-react';

const feedbackTableContent = props => (
  <Table celled compact definition>
    <Table.Header fullWidth>
      <Table.Row>
        <Table.HeaderCell>Rated User</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.rows}
    </Table.Body>
  </Table>
)

export default feedbackTableContent;
