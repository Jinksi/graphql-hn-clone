import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'
import Link from './Link'

class LinkList extends Component {
  updateCacheAfterVote = (store, createVote, linkId) => {
    // Read current state of cached data for `allLinksQuery` from the store
    const data = store.readQuery({ query: allLinksQuery })
    // Retrieve the link that the user just voted for
    const votedLink = data.allLinks.find(link => link.id === linkId)
    // Reset this link's votes state to the votes state that was returned by the server
    votedLink.votes = createVote.link.votes
    // save this modified data and save it to the store
    store.writeQuery({query: allLinksQuery, data})
  }

  render () {
    if (this.props.data && this.props.data.loading) {
      return <div>Loading</div>
    }
    if (this.props.data && this.props.data.error) {
      return <div>Error</div>
    }

    const linksToRender = this.props.data.allLinks

    return linksToRender.map((link, index) =>
      <Link
        key={link.id}
        index={index}
        updateStoreAfterVote={this.updateCacheAfterVote}
        userId={this.props.userId}
        link={link}
      />
    )
  }
}

const allLinksQuery = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`
export default graphql(allLinksQuery)(LinkList)
