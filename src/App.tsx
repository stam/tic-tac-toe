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
  const [userA] = useState(new User());
  const [userB] = useState(new User());

  const start = useCallback(() => {
    const firstPlayer = userStore.createIfNotExists(userA);
    const secondPlayer = userStore.createIfNotExists(userB);
    gameStore.start(firstPlayer, secondPlayer);
  }, [userA, userB]);

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
            <LobbyScreen userA={userA} userB={userB} start={start}/>
            <Ranking />
          </SingleRowLayout>
        )}
      </UserContext.Provider>
    </GameContext.Provider>
  );
};

export default observer(App);
