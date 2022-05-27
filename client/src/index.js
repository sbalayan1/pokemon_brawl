import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { CircularProgress } from '@mui/material';

import App from './Components/App';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <Suspense fallback={CircularProgress}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);



