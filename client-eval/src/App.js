import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import * as authAction from './store/actions/authAction'
import AdminHome from './containers/Admin/Admin'
import Login from './containers/Auth/Login'
import EmployeeHome from './containers/Employee/Employee'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render () {
    let authenticatedRoutes = null
    if (this.props.isAuthenticated) {
      if (this.props.isAdmin) {
        authenticatedRoutes = (
          <Switch>
            <Route path='/admin' exact component={AdminHome} />
            <Redirect to='/admin' />
          </Switch>
        )
      } else {
        authenticatedRoutes = (
          <Switch>
            <Route path='/feedbacks' exact component={EmployeeHome} />
            <Redirect to='/feedbacks' />
          </Switch>
        )
      }
    } else {
      authenticatedRoutes = (
        <Switch>
          <Route path='/login' component={Login} />
          <Redirect to='/login' />
        </Switch>
      )
    }

    return authenticatedRoutes
  }
}

const mapStateToProps = state => (
  {
    isAuthenticated: !!state.auth.user,
    isAdmin: state.auth.user && state.auth.user.admin
  }
)

const mapDispatchToProps = dispatch => (
  {
    onTryAutoSignIn: () => dispatch(authAction.authCheckState())
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
