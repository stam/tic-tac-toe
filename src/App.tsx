import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import Grid from './components/Grid';
import Ranking from './components/Ranking';
import GameStore from './store/Game';
import { UserStore, User } from './store/User';
import Status from './components/Status';
import LobbyScreen from './components/LobbyScreen';

const Layout = styled.main`
  height: 100vh;
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-template-rows: 100px 8fr;
  grid-template-areas:
    'info info'
    'main rank';
`;

const SingleRowLayout = styled(Layout)`
  grid-template-areas:
    'main info'
    'main rank';
`;

const gameStore = new GameStore();
const userStore = new UserStore();
userStore.seed();

export const GameContext = React.createContext(gameStore);
export const UserContext = React.createContext(userStore);

const App: React.FC = () => {
  const [usernameA, setUsernameA] = useState(User.generateName());
  const [usernameB, setUserBName] = useState(User.generateName());

  const start = useCallback((firstName: string, secondName: string) => {
    setUsernameA(firstName);
    setUserBName(secondName);
    const firstPlayer = userStore.createIfNotExists(firstName);
    const secondPlayer = userStore.createIfNotExists(secondName);
    gameStore.start(firstPlayer, secondPlayer);
  }, []);

  return (
    <GameContext.Provider value={gameStore}>
      <UserContext.Provider value={userStore}>
        {gameStore.started ? (
          <Layout>
            <Status />
            <Grid />
            <Ranking />
          </Layout>
        ) : (
          <SingleRowLayout>
            <LobbyScreen initialUsernameA={usernameA} initialUsernameB={usernameB} start={start}/>
            <Ranking />
          </SingleRowLayout>
        )}
      </UserContext.Provider>
    </GameContext.Provider>
  );
};

export default observer(App);
