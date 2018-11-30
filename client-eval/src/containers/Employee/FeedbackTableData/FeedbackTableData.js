import React from 'react';
import { Header, Button, Icon, Table, Rating } from 'semantic-ui-react';

import FeedbackTableContent from './FeedbackTableContent/FeedbackTableContent';

const feedbackTableData = props => {
  const feedbackValues = Object.values(props.feedbacks)
  let pendingRows = feedbackValues.map( feedb => (
    feedb.id && feedb.pending ?
      <Table.Row key={feedb.id}>
        <Table.Cell>{feedb.rated_user_name}</Table.Cell>
        <Table.Cell>{feedb.updated_at}</Table.Cell>
        <Table.Cell>
          <Rating onRate={props.ratingAction} feedbackid={feedb.id} defaultRating={feedb.rating} maxRating={5} />
          <Button onClick={props.submitRatingAction} feedbackid={feedb.id}
             icon='paper plane'>
          </Button>
       </Table.Cell>
      </Table.Row>
      : null
  ))

  let completedRows = feedbackValues.map( feedb => (
    feedb.id && !feedb.pending ?
      <Table.Row key={feedb.id}>
        <Table.Cell>{feedb.rated_user_name}</Table.Cell>
        <Table.Cell>{feedb.updated_at}</Table.Cell>
        <Table.Cell><Rating defaultRating={feedb.rating} maxRating={5} disabled /></Table.Cell>
      </Table.Row>
      : null
  ))

  return (
    <React.Fragment>
      <Header as='h2' icon textAlign='center' color='teal'>
        <Icon name='unordered list' circular />
        <Header.Content>
          List of Pending Feedbacks
        </Header.Content>
      </Header>

      <FeedbackTableContent rows={pendingRows}/>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Header.Content>
            List of Given Feedbacks
          </Header.Content>
        </Header>
      <FeedbackTableContent rows={completedRows}/>
    </React.Fragment>
  )
}

export default feedbackTableData;
