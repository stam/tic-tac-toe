import React, { useContext, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { GameContext } from '../App';
import { TicTacValue } from '../store/Game';
import { observer } from 'mobx-react-lite';

interface TicProps {
  editable: boolean;
}

const Tic = styled.button<TicProps>`
  border: none;
  outline: none;
  background: white;
  font-size: 5rem;
  height: 200px;
  width: 200px;

  ${props =>
    props.editable &&
    css`
      &:hover {
        opacity: 0.5;
      }
    `}
`;

interface CellProps {
  children: TicTacValue;
  index: number;
}

const Cell: React.FC<CellProps> = ({ children: value, index }) => {
  const game = useContext(GameContext);
  const editable = value === null;

  const [hovering, setHovering] = useState(false);

  const handleClick = useCallback(() => {
    game.set(index);
  }, [game, index]);

  const hoverValue = hovering ? game.currentPlayer : null;

  return (
    <Tic
      onClick={handleClick}
      editable={editable}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      {value || hoverValue}
    </Tic>
  );
};

export default observer(Cell);
