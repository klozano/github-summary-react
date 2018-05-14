import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Label } from 'semantic-ui-react';

const Repository = ({ name, fullname, description, url, issues, openedIssues, forks }) => (
  <Card>
    <Card.Content>
      <Card.Header>
        <a target="_blank" href={url}>
          {name}
        </a>
      </Card.Header>
      <Card.Meta>{fullname}</Card.Meta>
      {
        description &&
        <Card.Description>{description}</Card.Description>
      }
    </Card.Content>
    <Card.Content extra>
      <Label>
        <Icon name='bug' />
        {issues}
      </Label>
      <Label>
        <Icon name='warning circle' />
        {openedIssues}
      </Label>
      <Label>
        <Icon name='fork' />
        {forks}
      </Label>
    </Card.Content>
  </Card>
)

Repository.propTypes = {
  name: PropTypes.string,
  fullname: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  issues: PropTypes.number,
  openedIssues: PropTypes.number,
  forks: PropTypes.number,
}

export default Repository;