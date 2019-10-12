import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../App';
import { observer } from 'mobx-react-lite';

const Container = styled.nav`
  padding: 2rem;
  font-size: 2rem;
  grid-area: info;
`;

const GameStatus = () => {
  const game = useContext(GameContext);

  return (<Container>
    Current player: <b>{game.currentPlayer}</b>
  </Container>);
}

export default observer(GameStatus);
