import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './index.scss';

import App from './app';

ReactDom.render(
  <CookiesProvider>
    <Router>
      <App />
    </Router>
  </CookiesProvider>,
  document.getElementById('root')
);