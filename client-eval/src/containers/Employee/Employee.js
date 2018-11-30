import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader, Header, Button, Icon, Table, Rating } from 'semantic-ui-react';

import * as feedbackAction from '../../store/actions/feedbackAction';


const RenderTable = props => (
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

class Employee extends Component {
  state = {
    ratedFeedbacks: {}
  }

  componentDidMount () {
    this.props.onInitFeedback(this.props.user.id);
  }

  handleSubmitRating = (e, {feedbackid}) => {
    const rating = this.state.feedbacks[feedbackid] || 0
    this.props.onUpdateFeedback(feedbackid, rating)
  }

  handleRating = (e, {feedbackid, rating}) => {
    this.setState({
      ...this.state,
      feedbacks: {
        ...this.state.feedbacks,
        [feedbackid]: rating
      }
    })
  }

  render () {
    let {feedbacks} = this.props

    let table = (
      <Dimmer active inverted>
        <Loader content='Loading' />
      </Dimmer>
    )

    if (feedbacks) {
      const feedbackValues = Object.values(feedbacks)
      let pendingRows = feedbackValues.map( feedb => (
        feedb.id && feedb.pending ?
          <Table.Row key={feedb.id}>
            <Table.Cell>{feedb.rated_user_name}</Table.Cell>
            <Table.Cell>{feedb.updated_at}</Table.Cell>
            <Table.Cell>
              <Rating onRate={this.handleRating} feedbackid={feedb.id} defaultRating={feedb.rating} maxRating={5} />
              <Button onClick={this.handleSubmitRating} feedbackid={feedb.id}
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

      table = (
        <React.Fragment>
          <Header as='h2' icon textAlign='center' color='teal'>
            <Icon name='unordered list' circular />
            <Header.Content>
              List of Pending Feedbacks
            </Header.Content>
          </Header>

          <RenderTable rows={pendingRows}/>
            <Header as='h2' icon textAlign='center' color='teal'>
              <Header.Content>
                List of Given Feedbacks
              </Header.Content>
            </Header>
          <RenderTable rows={completedRows}/>
        </React.Fragment>
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
    feedbacks: state.feedback.feedbacks,
    user: state.auth.user
  }
)

const mapDispatchToProps = dispatch => (
  {
    onInitFeedback: userId => dispatch(feedbackAction.initFeedback(userId)),
    onUpdateFeedback: (feedbackId, rating) => dispatch(feedbackAction.updateFeedback(feedbackId, rating)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Employee)
