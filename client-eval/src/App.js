import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import * as authAction from './store/actions/authAction';
import AdminHome from './containers/Admin/Admin';
import Layout from './components/Layout/Layout';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import EmployeeHome from './containers/Employee/Employee';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  handleAuth = () => {
    const path = this.props.isAuthenticated ? '/logout' : '/login'
    this.props.history.replace(path)
  }

  render () {
    let authenticationRoutes = null
    if (this.props.isAuthenticated) {
      if (this.props.isAdmin) {
        authenticationRoutes = (
          <Switch>
            <Route path='/admin' exact component={AdminHome} />
            <Route path='/logout' exact component={Logout} />
            <Redirect to='/admin' />
          </Switch>
        )
      } else {
        authenticationRoutes = (
          <Switch>
            <Route path='/feedbacks' exact component={EmployeeHome} />
            <Route path='/logout' exact component={Logout} />
            <Redirect to='/feedbacks' />
          </Switch>
        )
      }
    } else {
      authenticationRoutes = (
        <Switch>
          <Route path='/login' component={Login} />
          <Redirect to='/login' />
        </Switch>
      )
    }

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        authAction={this.handleAuth}
      >
        {authenticationRoutes}
      </Layout>
    )
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
