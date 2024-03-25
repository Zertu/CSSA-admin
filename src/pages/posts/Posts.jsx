import React from 'react';
import { Routes, Route,  } from 'react-router';

import PostList from './list/PostList';
import PostNew from './new/PostNew';

class Posts extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/app/posts" exact component={PostList} />
        <Route path="/app/posts/new" exact component={PostNew} />
      </Routes>
    );
  }
}

export default (Posts);
