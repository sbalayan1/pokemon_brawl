import React, {Suspense} from 'react';
import {createRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { GlobalStateProvider } from './GlobalState';
import App from './Components/App'
import './style.css';

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <GlobalStateProvider>
    <Suspense fallback={CircularProgress}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Suspense>
  </GlobalStateProvider>
)



