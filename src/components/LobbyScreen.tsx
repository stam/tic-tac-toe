import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { User } from '../store/User';
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
  userA: User;
  userB: User;
  start: () => void;
}

const LobbyScreen : React.FC<LobbyScreenProps> = ({ userA, userB, start }) => {
  return (
    <Container onSubmit={start}>
      <Title>Get ready for a game of tic tac toe!</Title>
      <p>
        <Input
          value={userA.name}
          onChange={e => {
            userA.name = e.target.value;
          }}
        />{' '}
        will play as X
      </p>
      <p>
        <Input
          value={userB.name}
          onChange={e => {
            userB.name = e.target.value;
          }}
        />{' '}
        will play as O
      </p>
      <Button onClick={start}>Start</Button>
    </Container>
  );
};

export default observer(LobbyScreen);
