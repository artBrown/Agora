import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { grey900 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Card, CardTitle, CardActions } from 'material-ui/Card';

import Unimplemented from 'components/Unimplemented';
import ThreadActions from 'components/ThreadActions';
import { ThreadIcon, PostIcon } from 'components/icons';
import ParentGroup from 'components/ParentGroup';

import { requireThread } from 'hocs/resources';
import { getAccountUserIDs } from 'selectors/accountPage';

const mapStateToProps = (state, { id }) => {
  const thread = state.threads[id];
  const users = getAccountUserIDs(state);
  return {
    thread,
    isOwned: thread ? users.includes(thread.user_id) : false
  }
};

const actionCreators = {
  push
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionCreators, dispatch),
    dispatch
  };
};

class ThreadHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, push } = this.props;
    push('/threads/' + id);
  }

  render() {
    const { id, thread, isOwned } = this.props;
    const parentID = thread.parent_group_id;
    const title = (
      <span
        onClick={this.handleClick}
      >
        <ThreadIcon />
        {`  ${thread.title}  `}
        <PostIcon />
        {`  ${thread.posts}  `}
      </span>
    );
    return (
      <div>
        {
          parentID
          ? <span>
            <ParentGroup id={parentID} />
          </span>
          : null
        }
        <Card
          initiallyExpanded={false}
        >
          <CardTitle
            actAsExpander={true}
            showExpandableButton={true}
            title={title}
            subtitle="Thread description"
          />
          <CardActions expandable={true}>
            <ThreadActions id={id} isOwned={isOwned} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireThread(ThreadHeader));
