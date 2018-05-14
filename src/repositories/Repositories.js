import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

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
          console.log(repositories);
        }
      )
  }

  render() {
    const { match } = this.props;
    return <div>{match.params.username}</div>
  }
}

Repositories.propTypes = {
  match: PropTypes.any,
  location: PropTypes.any,
};

export default Repositories;