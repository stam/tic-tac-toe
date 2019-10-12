import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../App';
import Cell from './Cell';
import { observer } from 'mobx-react-lite';

const GridLayout = styled.section`
  grid-area: main;
  padding: 2rem;

  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5rem;
`;


const Grid = () => {
  const game = useContext(GameContext);
  return (
    <GridLayout>
      {game.moves.map((value, i) => (
        <Cell key={i} index={i}>{value}</Cell>
      ))}
    </GridLayout>
  );
};

export default observer(Grid);
