import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Grid } from 'semantic-ui-react';

const REPO_PAGE_SIZE = 4;
class Repositories extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      repositories: [],
    };
  }

  componentDidMount() {
    this.__getRepositories();
  }

  __getRepositories() {
    const { match, location } = this.props;
    const { page = 0 } = queryString.parse(location.search);
    fetch(`https://api.github.com/users/${match.params.username}/repos?page=${page}&per_page=${REPO_PAGE_SIZE}`)
      .then(response => response.json())
      .then(
        repositories => {
          this.setState({ repositories, loading: false });
        }
      )
  }

  render() {
    const { repositories } = this.state;
    return (
      <Grid container columns={4}>
        {
          repositories.map((repo) => (
            <Grid.Column key={repo.id}>
              <div> {repo.name} </div>
            </Grid.Column>
          ))
        }
      </Grid>
    );
  }
}

Repositories.propTypes = {
  match: PropTypes.any,
  location: PropTypes.any,
};

export default Repositories;