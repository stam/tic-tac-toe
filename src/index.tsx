import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createGlobalStyle } from 'styled-components';

// prepare data stores

const GlobalStyle = createGlobalStyle`
 * {
     box-sizing: border-box;
 }
`

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>
  , document.getElementById('root'));

