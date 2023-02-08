import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { reducer } from './state/reducer'
import { StateProvider } from './state/state';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>
)
