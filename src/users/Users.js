import React from 'react';
import { Grid } from 'semantic-ui-react';

import User from './User';

const PAGE_SIZE = 16;
export default class Users extends React.Component {

  constructor() {
    super();
    this.state = {
      offset: 0,
      users: []
    }
  }

  componentDidMount() {
    fetch(`https://api.github.com/users?since=${this.state.offset}&per_page=${PAGE_SIZE}`)
      .then(response => response.json())
      .then(
        users => {
          console.log(users);
          this.setState((prevState) => ({ ...prevState, offset: prevState + PAGE_SIZE, users }))
        }
      )
  }

  render() {
    return (
      <Grid container columns={4}>
        {
          this.state.users.map((user) => (
            <Grid.Column key={user.id}>
              <User profileImage={user.avatar_url} username={user.login} githubLink={user.html_url}/>
            </Grid.Column>
          ))
        }
      </Grid>
    );
  }
}
