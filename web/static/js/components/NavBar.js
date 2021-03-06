import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { HomeIcon, SearchIcon } from 'components/icons'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import { grey50, grey200, grey900 } from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'

import { signedIn } from 'global'

const mapStateToProps = ({ routing }) => {
  const path = routing.locationBeforeTransitions.pathname.split('/')
  path.shift()
  return {
    path,
  }
}

class NavBar extends Component {
  transitionTo(path) {
    return (event) => {
      this.props.dispatch(push(path))
    }
  }

  render() {
    const { path } = this.props
    return (
      <AppBar
        iconElementLeft={
            <span>
              <IconButton
                iconClassName="material-icons"
                touch={true}
                iconStyle={{ color: grey50 }}
                children="menu"
                onClick={this.props.toggleLeftNav}
              />
              <IconButton
                iconClassName="material-icons"
                touch={true}
                iconStyle={{ color: grey50 }}
                children="home"
                onClick={this.transitionTo('/')}
              >
              </IconButton>
            </span>
        }
        iconElementRight={
          <span>
            <IconButton
              iconClassName="material-icons"
              touch={true}
              iconStyle={{ color: grey50 }}
              children="search"
              onClick={this.transitionTo('/search')}
            />
            {
              !signedIn
              ? <FlatButton
                backgroundColor={grey50}
                hoverColor={grey200}
                labelStyle={{ color: grey900 }}
                label="Sign in"
                onClick={this.transitionTo('/signin')}
              />
              : null
            }
          </span>
        }
      />
    )
  }
}

export default connect(mapStateToProps)(NavBar)
