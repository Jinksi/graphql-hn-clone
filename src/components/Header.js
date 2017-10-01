import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render () {
    const { userId } = this.props
    return (
      <div className='flex pa1 justify-between nowrap orange'>
        <div className='flex flex-fixed black'>
          <div className='fw7 mr1'>Hacker News</div>
          <Link to='/' className='ml1 no-underline black'>new</Link>
          {userId &&
            <div className='flex'>
              <div className='ml1'>|</div>
              <Link to='/create' className='ml1 no-underline black'>submit</Link>
            </div>
          }
        </div>
        <div className='flex flex-fixed'>
          {userId
            ? (
              <div className='ml1 pointer black' onClick={this.props.handleLogout}>
                logout
              </div>
            ) : (
              <Link to='/login' className='ml1 no-underline black'>login</Link>
            )
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
