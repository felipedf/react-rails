import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';

class UIModal extends Component {
  state = { modalOpen: false }

  handleClose = () => this.setState({ modalOpen: false })
  handleOpen = () => this.setState({ modalOpen: true })

  render() {
    let previewEmployeeButton = (
      <Button onClick={this.handleOpen}
         icon floated='center'>
        <Icon name='eye' floated='right' />
      </Button>
    )

    return (
      <Modal
        trigger={previewEmployeeButton}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Default Profile Image</Header>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UIModal
