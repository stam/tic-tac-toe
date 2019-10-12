import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../App';
import { observer } from 'mobx-react-lite';

const Container = styled.nav`
  font-size: 2rem;
  padding-left: 2rem;
  grid-area: info;
`;

const GameStatus = () => {
  const game = useContext(GameContext);


  return (<Container>
    {game.isWon ? <p>Player <b>{game.winningPlayer}</b> has won 🎉🎉🎉</p> : <p>Current player: <b>{game.currentPlayer}</b></p>}
  </Container>);
}

export default observer(GameStatus);
