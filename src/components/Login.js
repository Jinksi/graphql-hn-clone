import React, { Component } from 'react'
import { graphql, gql, compose } from 'react-apollo'

class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: ''
  }

  _confirm = async () => {
    const { name, email, password } = this.state
    let result
    if (this.state.login) {
      result = await this.props.signinUserMutation({
        variables: {
          email,
          password
        }
      })
    } else {
      result = await this.props.createUserMutation({
        variables: {
          name,
          email,
          password
        }
      })
    }
    const id = result.data.signinUser.user.id
    const token = result.data.signinUser.token
    this._saveUserData(id, token)
    this.props.history.push('/')
  }

  _saveUserData = (id, token) => {
    this.props.handleLogin(id, token)
  }

  render () {
    return (
      <div>
        <h4 className='mv3'>{this.state.login ? 'Login' : 'Sign Up'}</h4>
        <div className='flex flex-column'>
          {!this.state.login &&
          <input
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
            placeholder='Your name'
          />}
          <input
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type='text'
            placeholder='Your email address'
          />
          <input
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />
        </div>
        <div className='flex mt3'>
          <div
            className='pointer mr2 button'
            onClick={() => this._confirm()}
          >
            {this.state.login ? 'login' : 'create account' }
          </div>
          <div
            className='pointer button'
            onClick={() => this.setState({ login: !this.state.login })}
          >
            {this.state.login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }
}

const createUserMutation = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`
const signinUserMutation = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`
export default compose(
  graphql(createUserMutation, { name: 'createUserMutation' }),
  graphql(signinUserMutation, { name: 'signinUserMutation' })
)(Login)
