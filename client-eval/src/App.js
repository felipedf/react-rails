import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminHome from './containers/Admin/Admin'
import Home from './Home'
import NotFound from './NotFound'

class App extends Component {
  render () {
    return (
      <Switch>
        <Route path='/admin' component={AdminHome} />
        <Route path='/' exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
