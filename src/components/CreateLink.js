import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'

class CreateLink extends Component {
  state = {
    description: '',
    url: ''
  }

  _createLink = async () => {
    const postedById = this.props.userId
    if (!postedById) {
      console.error('No User Logged In')
      return
    }
    const { description, url } = this.state
    await this.props.createLinkMutation({
      variables: {
        description,
        url,
        postedById
      }
    })
    this.props.history.push('/')
  }

  render () {
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the link'
          />
          <input
            className='mb2'
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the link'
          />
        </div>
        <button
          onClick={() => this._createLink()}
        >
          Submit
        </button>
      </div>
    )
  }
}

const mutation = gql`
  mutation CreateLinkMutation( $description: String!, $url: String!, $postedById: ID! ) {
    createLink(
      description: $description,
      url: $url,
      postedById: $postedById
    ) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`
export default graphql(mutation, {
  name: 'createLinkMutation'
})(CreateLink)
