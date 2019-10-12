import React from 'react';
import styled from 'styled-components';

const GridLayout = styled.section`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  border: 0.5rem solid #ccc;
  grid-gap: 0.5rem;
  background: #ccc;
`;

const Cell = styled.button`
  border: none;
  outline: none;
  background: white;
  height: 200px;
  width: 200px;
`;


const Grid = () => {
  const data = ['X', 'O', '', 'X', 'O', 'X', 'X', 'X', 'X'];

  return (
    <GridLayout>
      {data.map(
      (value, i) => <Cell key={i}>{value}</Cell>)}
    </GridLayout>
  )
}

export default Grid;
