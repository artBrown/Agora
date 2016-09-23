import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { Card, CardHeader, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';
import GroupActions from 'components/GroupActions';

import { requireGroup } from 'hocs/resources';

const mapStateToProps = ({ theme, groups }, { id }) => {
  return {
    group: groups[id],
    theme
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

class Group extends Component {
  render() {
    const { id, group, push, zDepth, theme } = this.props;
    return (
      <Card
        style={theme.group.root}
        zDepth={zDepth}
      >
        <CardHeader
          style={theme.group.header}
          title={<ResourceTitle
            insertedAt={group.inserted_at}
            user={group.user_id}
            title=""
          />}
          showExpandableButton={true}
        />
        <Divider />
        <CardText
          style={theme.group.body}
          onClick={() => push('/groups/' + id)}
          style={{
            cursor: 'pointer'
          }}
        >
          {`${group.name} (${group.threads}, ${group.groups}, ${group.members})`}
        </CardText>
        <CardActions expandable={true}>
          <GroupActions id={id} />
        </CardActions>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requireGroup(Group));
