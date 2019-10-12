import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext, GameContext } from '../App';
import { orderBy } from 'lodash';

const Container = styled.aside`
  padding-left: 2rem;
  grid-area: rank;
`;

interface RowProps {
  playing: boolean;
}
const Row = styled.div<RowProps>`
  max-width: 200px;
  display: flex;
  justify-content: space-between;

  ${props => props.playing && 'background-color: rgba(0, 0, 0, 0.1)'}
`;

const Ranking = () => {
  const userStore = useContext(UserContext);
  const game = useContext(GameContext);

  const sortedUsers = orderBy(userStore.users, 'elo', 'desc');

  return (
    <Container>
      <h1>Leaderboard</h1>
      <ol>
        {sortedUsers.map(user => (
          <li><Row playing={game.users.includes(user)}>
            {user.name} <label>{user.elo}</label>
          </Row></li>
        ))}
      </ol>
    </Container>
  );
};

export default Ranking;
