import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'

import Thread from 'components/Thread'

class ThreadList extends Component {
    transitionTo(path) {
        return () => {
            this.props.dispatch(push(path));
        }
    }

    render() {
        return <div>
            {
                this.props.threads.map(({ title, id, user }, key) => <Thread
                    key={key}
                    id={id}
                    title={title}
                    user={user}
                />)
            }
        </div>
    }
}

export default connect()(ThreadList)