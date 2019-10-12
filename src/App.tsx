import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import Grid from './components/Grid';
import Ranking from './components/Ranking';
import GameStore from './store/Game';

const Layout = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const store = new GameStore();

export const GameContext = React.createContext(store);

const App: React.FC = () => {
  return (
    <GameContext.Provider value={store}>
      <Layout>
        <Grid />
        <Ranking />
      </Layout>
    </GameContext.Provider>
  );
};

export default observer(App);
