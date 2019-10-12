import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { observer } from 'mobx-react-lite';

const Container = styled.form`
  padding-left: 2rem;
  font-size: 2rem;
  max-width: 700px;
  margin: auto;
  display: flex;
  flex-direction: column;

  > ${Button} {
    margin-top: 3rem;
  }
`;

const Title = styled.h1``;

const Input = styled.input`
  width: 250px;
  border-radius: 4px;
  border: 2px solid #ccc;
  font-size: 2rem;
  padding: 0.25rem 1rem;
`;

interface LobbyScreenProps {
  initialUsernameA: string;
  initialUsernameB: string;
  start: (firstName: string, secondName: string) => void;
}

const LobbyScreen : React.FC<LobbyScreenProps> = ({ initialUsernameA, initialUsernameB, start }) => {
  const [usernameA, setUsernameA] = useState(initialUsernameA);
  const [usernameB, setUsernameB] = useState(initialUsernameB);

  return (
    <Container onSubmit={() => start(usernameA, usernameB)}>
      <Title>Get ready for a game of tic tac toe!</Title>
      <p>
        <Input
          value={usernameA}
          onChange={e => {
            setUsernameA(e.target.value);
          }}
        />{' '}
        will play as X
      </p>
      <p>
        <Input
          value={usernameB}
          onChange={e => {
            setUsernameB(e.target.value);
          }}
        />{' '}
        will play as O
      </p>
      <Button>Start</Button>
    </Container>
  );
};

export default observer(LobbyScreen);
