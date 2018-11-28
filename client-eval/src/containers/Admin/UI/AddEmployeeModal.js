import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';
import AddEmployeeForm from './AddEmployeeForm'

class UIModal extends Component {
  state = { modalOpen: false }

  handleClose = () => this.setState({ modalOpen: false })
  handleOpen = () => this.setState({ modalOpen: true })

  render() {
    let addEmployeeButton = (
      <Button onClick={this.handleOpen}
        floated='right' icon labelPosition='left' primary size='small'>
        <Icon name='user' /> Add Employee
      </Button>
    )

    return (
      <Modal
        trigger={addEmployeeButton}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Default Profile Image</Header>
              <AddEmployeeForm modalClose={this.handleClose} submitAction={this.props.submitAction}/>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UIModal