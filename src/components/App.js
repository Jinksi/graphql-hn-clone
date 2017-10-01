import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Header from './Header'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Login from './Login'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class App extends Component {
  state = {
    userId: window.localStorage.getItem(GC_USER_ID)
  }

  handleLogout = () => {
    localStorage.removeItem(GC_USER_ID)
    localStorage.removeItem(GC_AUTH_TOKEN)
    this.setState({
      userId: null
    })
    this.props.history.push(`/`)
  }

  handleLogin = (id, token) => {
    window.localStorage.setItem(GC_USER_ID, id)
    window.localStorage.setItem(GC_AUTH_TOKEN, token)
    this.setState({
      userId: window.localStorage.getItem(GC_USER_ID)
    })
  }

  render () {
    return (
      <div className='center w85'>
        <Header userId={this.state.userId} handleLogout={this.handleLogout} />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/login' component={(props) => <Login handleLogin={this.handleLogin} {...props} />} />
            <Route exact path='/create' component={(props) => <CreateLink userId={this.state.userId} {...props} />} />
            <Route exact path='/' component={LinkList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
