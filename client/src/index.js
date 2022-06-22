import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { CircularProgress } from '@mui/material';

import { GlobalStateProvider } from './GlobalState';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <GlobalStateProvider>
    <Suspense fallback={CircularProgress}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Suspense>
  </GlobalStateProvider>,
  document.getElementById('root')
);



