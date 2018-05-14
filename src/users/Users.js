import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import _last from 'lodash/last';

import User from './User';

const PAGE_SIZE = 16;
export default class Users extends React.Component {

  constructor() {
    super();
    this.state = {
      offset: 0,
      users: [],
      loading: true,
    };
    this._onLoadMore = this._onLoadMore.bind(this);
  }

  componentDidMount() {
    this.__getUsers();
  }

  _onLoadMore(event) {
    event.preventDefault();
    const { loading } = this.state;
    if (!loading) {
      this.setState({ loading: true }, this.__getUsers);
    }
  }

  __getUsers() {
    fetch(`https://api.github.com/users?since=${this.state.offset}&per_page=${PAGE_SIZE}`)
      .then(response => response.json())
      .then(
        users => {
          this.setState((prevState) => {
            const { users: currentUsers } = prevState;
            /* Using the id of last user of the incoming page, that in order to avoid issues, since the ids are not correlative */
            const offsetId = _last(users).id;
            const updatedUsers = [ ...currentUsers, ...users ];
            return { offset: offsetId, users: updatedUsers, loading: false }
          });
        }
      )
  }

  render() {
    const { users, loading } = this.state;
    return (
      <React.Fragment>
        <Grid container columns={4}>
          {
            users.map((user) => (
              <Grid.Column key={user.id}>
                <User id={user.id} profileImage={user.avatar_url} username={user.login} githubLink={user.html_url}/>
              </Grid.Column>
            ))
          }
        </Grid>
        <Button fluid onClick={this._onLoadMore} loading={loading}>Load more...</Button>
      </React.Fragment>
    );
  }
}
