import React, { Component } from 'react'
import { graphql, gql } from 'react-apollo'
import Link from './Link'

class LinkList extends Component {
  render () {
    if (this.props.data && this.props.data.loading) {
      return <div>Loading</div>
    }
    if (this.props.data && this.props.data.error) {
      return <div>Error</div>
    }

    const linksToRender = this.props.data.allLinks

    return linksToRender.map(link =>
      <Link key={link.id} link={link} />
    )
  }
}

const query = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      description
      url
    }
  }
`
export default graphql(query)(LinkList)
