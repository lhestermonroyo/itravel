import React from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <HashRouter>
    <App></App>
  </HashRouter>,
  document.getElementById('app')
);