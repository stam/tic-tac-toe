import React, { useContext, useCallback } from 'react';
import styled from 'styled-components';
import { GameContext } from '../App';
import { TicTacValue } from '../store/Game';
import { observer } from 'mobx-react-lite';


const Tic = styled.button`
  border: none;
  outline: none;
  background: white;
  font-size: 5rem;
  height: 200px;
  width: 200px;
`;

interface CellProps {
  children: TicTacValue;
  index: number;
}

const Cell : React.FC<CellProps> = ({ children, index}) => {

  const game = useContext(GameContext);
  const handleClick = useCallback(() => {
    game.set(index)
  }, [game, index]);
  return (
    <Tic onClick={handleClick}>{children}</Tic>
  );
};

export default observer(Cell);
