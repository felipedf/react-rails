import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';

import * as authAction from '../../store/actions/authAction'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleInputChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleLogin = () => {
    this.props.onAuth(this.state.email, this.state.password)
  }

  render() {
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />

                <Button onClick={this.handleLogin} color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  {
    onAuth: (email, password) => dispatch(authAction.auth(email, password)),
  }
)
export default connect(null, mapDispatchToProps)(Login)
