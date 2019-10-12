import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../App';

export const Container = styled.aside`
  padding-left: 2rem;
  grid-area: rank;
`;

const ListItem = styled.li``;

const Ranking = () => {
  const userStore = useContext(UserContext);

  return (
    <Container>
      <h1>Leaderboard</h1>
      <ol>
        {userStore.users.map(user => (
          <ListItem>
            {user.name} {user.elo}
          </ListItem>
        ))}
      </ol>
    </Container>
  );
};

export default Ranking;
