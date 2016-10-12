import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Linkify from 'react-linkify';

import Unimplemented from 'components/Unimplemented';
import ResourceTitle from 'components/ResourceTitle';
import PostActions from 'components/PostActions';

import { requirePost } from 'hocs/resources';

const mapStateToProps = ({ posts, theme }, { id }) => {
  return {
    post: posts[id],
    theme,
  };
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

class Post extends Component {
  render() {
    const { id, post, push, zDepth, theme } = this.props;
    return (
      <Paper
        style={theme.post.body}
      >
        <ResourceTitle
          user={post.user_id}
          title={post.title}
          path={'/posts/' + id}
          insertedAt={post.inserted_at}
        />
        <Divider style={{margin: "5px 0px"}} />
        <pre>
          <Linkify properties={{target: '_blank'}}>
            {post.text}
          </Linkify>
        </pre>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(requirePost(Post));
