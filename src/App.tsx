import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import Grid from './components/Grid';
import Ranking from './components/Ranking';
import GameStore from './store/Game';
import Status from './components/Status';

const Layout = styled.main`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-template-areas:
  "info info info info info info info info"
  "grid grid grid grid grid rank rank rank"
  "grid grid grid grid grid rank rank rank"
  "grid grid grid grid grid rank rank rank"
  "grid grid grid grid grid rank rank rank"
  "grid grid grid grid grid rank rank rank"
  "grid grid grid grid grid rank rank rank"
  "grid grid grid grid grid rank rank rank"
`;

const store = new GameStore();

export const GameContext = React.createContext(store);

const App: React.FC = () => {
  return (
    <GameContext.Provider value={store}>
      <Layout>
        <Status />
        <Grid />
        <Ranking />
      </Layout>
    </GameContext.Provider>
  );
};

export default observer(App);
