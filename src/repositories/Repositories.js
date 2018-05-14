import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Grid, Button, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Repository from './Repository';

const REPO_PAGE_SIZE = 8;
class Repositories extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      repositories: [],
      page: 1,
    };
  }

  componentDidMount() {
    this.__getRepositories();
  }

  componentWillReceiveProps(newProps) {
    this.__getRepositories(newProps);
  }

  __getRepositories(props) {
    const { match, location } = props || this.props;
    const { page = 1 } = queryString.parse(location.search);
    fetch(`https://api.github.com/users/${match.params.username}/repos?page=${page}&per_page=${REPO_PAGE_SIZE}`)
      .then(response => response.json())
      .then(
        repositories => {
          this.setState({ repositories, loading: false, page });
        }
      )
  }

  render() {
    const { repositories, page } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <Grid container stretched columns={4}>
          {
            repositories.map(({ id, name, full_name, description, html_url, forks, open_issues_count, open_issues }) => (
              <Grid.Column key={id}>
                <Repository
                  name={name}
                  fullname={full_name}
                  description={description}
                  url={html_url}
                  issues={open_issues}
                  openedIssues={open_issues_count}
                  forks={forks}/>
              </Grid.Column>
            ))
          }
        </Grid>
        <Segment basic textAlign='center'>
          {
            (+page > 1) && <Link to={`/repositories/${match.params.username}?page=${+page - 1}`}>
              <Button icon labelPosition='left' disabled={ page === 1}>
                <Icon name='left arrow' />
                Prev. Page
              </Button>
            </Link>
          }
          {
            (repositories.length !== 0) && <Link to={`/repositories/${match.params.username}?page=${+page + 1}`}>
              <Button icon labelPosition='right'>
                Next Page
                <Icon name='right arrow' />
              </Button>
            </Link>
          }
        </Segment>
      </React.Fragment>
    );
  }
}

Repositories.propTypes = {
  match: PropTypes.any,
  location: PropTypes.any,
};

export default Repositories;