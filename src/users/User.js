import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

const User = ({ profileImage, username, githubLink }) => (
  <Card fluid>
    <Image src={profileImage} size="large"/>
    <Card.Content>
      <Card.Header>
        {username}
      </Card.Header>
    </Card.Content>
    <Card.Content extra>
      <a target="_blank" href={githubLink}>
        <Icon name='github' />
      </a>
    </Card.Content>
  </Card>
);

export default User;
