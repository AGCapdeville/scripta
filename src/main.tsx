import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './Global.css'
import App from './App'

import { loadPlayerData } from './utility/userData';

let root = document.getElementById('root');

loadPlayerData();

if (root)
  createRoot(root).render(
    <BrowserRouter>
      {/* <StrictMode> */}
      <App />
      {/* </StrictMode> */}
    </BrowserRouter>
  )
