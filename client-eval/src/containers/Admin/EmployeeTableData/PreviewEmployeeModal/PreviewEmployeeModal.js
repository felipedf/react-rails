import React, { Component } from 'react';
import { Button, Modal, Icon, Dropdown } from 'semantic-ui-react';

class PreviewEmployeeModal extends Component {
  state = { modalOpen: false, currentValue: null }

  handleRequestReview = () => {
    this.props.submitAction(this.props.currentEmployee.id, this.state.currentValue)
    this.handleClose();
  }

  handleClose = () => this.setState({ modalOpen: false })
  handleOpen = () => this.setState({ modalOpen: true })

  handleChange = (e, { value }) => this.setState({ currentValue: value })

  render() {
    const {employees, currentEmployee} = this.props

    // This creates a list of options with the correct format to use
    // in the dropdown 
    let employeesOptions = Object.values(employees).reduce( (arr, emp) => {
      if (emp.id !== currentEmployee.id) {
        arr.push({
          text: emp.email,
          value: emp.id
        })
      }
      return arr
    }, [])

    return (
      <Modal
        trigger={<Button onClick={this.handleOpen} icon='eye'/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Assign an employee to be reviewed</Modal.Header>
        <Modal.Content>
          <Dropdown
            placeholder='Select an employee'
            onChange={this.handleChange}
            fluid selection options={employeesOptions} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={this.handleRequestReview}
            color='green' inverted>
            <Icon name='checkmark' /> Request Review
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default PreviewEmployeeModal
