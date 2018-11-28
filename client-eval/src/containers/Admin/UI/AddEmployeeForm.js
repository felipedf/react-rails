import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class AddEmployeeForm extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  handleSubmit = () => {
    this.props.modalClose()
    this.props.submitAction(this.state)
  }

  handleInputChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <label>Full Name</label>
          <input
            name='name'
            placeholder='Full Name'
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            name='email'
            type='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Button onClick={this.handleSubmit} type='button'>Submit</Button>
      </Form>
    )
  }
}

export default AddEmployeeForm
