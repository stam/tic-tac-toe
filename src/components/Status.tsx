import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../App';
import { observer } from 'mobx-react-lite';
import Button from './Button';

const Container = styled.nav`
  font-size: 2rem;
  padding: 1rem 0 1rem 2rem;
  grid-area: info;

  p {
    margin: 0;
  }

  ${Button} {
    margin-left: 2rem;
  }
`;

const GameStatus = () => {
  const game = useContext(GameContext);

  return (
    <Container>
      {game.isWon ? (
        <div>
          Player <b>{game.winningPlayer}</b> has won 🎉🎉🎉
          <Button onClick={game.reset}>Play again</Button>
        </div>
      ) : (
        <p>
          Current player: <b>{game.currentPlayer}</b>
        </p>
      )}
    </Container>
  );
};

export default observer(GameStatus);
