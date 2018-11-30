import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

import './Layout.css'

const layout = props => (
  <React.Fragment>
    <Menu
      fixed='top'
      inverted
      size='large'
    >
      <Container>
        <Menu.Item as='a' active>
          Home
        </Menu.Item>
        <Menu.Item position='right'>
          <Button as='a' inverted primary onClick={props.authAction}>
            {props.isAuthenticated ? 'Log Out' : 'Log In' }
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
    <main className="Content">
      {props.children}
    </main>
  </React.Fragment>
)

export default layout;
