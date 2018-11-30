import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Container } from 'semantic-ui-react';

import * as feedbackAction from '../../store/actions/feedbackAction';
import FeedbackTableData from './FeedbackTableData/FeedbackTableData';

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
      table = (
        <FeedbackTableData
          ratingAction={this.handleRating}
          submitRatingAction={this.handleSubmitRating}
          feedbacks={feedbacks}
        />
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
