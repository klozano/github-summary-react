import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Grid, Button, Icon, Segment, Message, Loader } from 'semantic-ui-react';
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
    this.setState({ loading: true }, () => {
      this.__getRepositories(newProps);
    })
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

  renderRepositoriesGrid() {
    const { repositories } = this.state;
    if (repositories.length > 0) {
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    } else {
      return (
        <Segment basic full textAlign='center'>
          <Message
            icon='inbox'
            header='Not found repositories'
          />
        </Segment>
      );
    }
  }

  renderLoader() {
    return (
      <Segment basic padded>
        <Loader active />
      </Segment>
    )
  }

  render() {
    const { repositories, page, loading } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <Grid container stretched columns={4} textAlign='center'>
          { loading ? this.renderLoader() : this.renderRepositoriesGrid() }
        </Grid>
        <Segment basic textAlign='center'>
          {
            (+page > 1) && <Link to={`/repositories/${match.params.username}?page=${+page - 1}`}>
              <Button icon labelPosition='left' loading={loading}>
                <Icon name='left arrow' />
                Prev. Page
              </Button>
            </Link>
          }
          {
            (repositories.length !== 0) && <Link to={`/repositories/${match.params.username}?page=${+page + 1}`}>
              <Button icon labelPosition='right' loading={loading}>
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