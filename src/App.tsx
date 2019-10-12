import React, { useState } from 'react';
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
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-template-areas:
    'info info info info info info info info'
    'grid grid grid grid grid rank rank rank'
    'grid grid grid grid grid rank rank rank'
    'grid grid grid grid grid rank rank rank'
    'grid grid grid grid grid rank rank rank'
    'grid grid grid grid grid rank rank rank'
    'grid grid grid grid grid rank rank rank'
    'grid grid grid grid grid rank rank rank';
`;

const gameStore = new GameStore();
const userStore = new UserStore();

export const GameContext = React.createContext(gameStore);
export const UserContext = React.createContext(userStore);

const App: React.FC = () => {
  const [userA] = useState(new User());
  const [userB] = useState(new User());

  return (
    <GameContext.Provider value={gameStore}>
      <UserContext.Provider value={userStore}>
        {gameStore.started ?
          <Layout>
            <Status />
            <Grid />
            <Ranking />
          </Layout>
          :
          <LobbyScreen  userA={userA} userB={userB} />
        }
      </UserContext.Provider>
    </GameContext.Provider>
  );
};

export default observer(App);
