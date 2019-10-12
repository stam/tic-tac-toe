import React from 'react';
import styled from 'styled-components';

import Grid from './components/Grid';
import Ranking from './components/Ranking';

const Layout = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const App: React.FC = () => {
  return (
    <Layout>
      <Grid />
      <Ranking />
    </Layout>
  );
}

export default App;
