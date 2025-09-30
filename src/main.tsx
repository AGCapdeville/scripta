import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './Global.css'
import App from './App'

import { loadPlayerData } from './utility/userData';
import { AuthProvider } from './context/AuthContext';

let root = document.getElementById('root');

loadPlayerData();

if (root)
  createRoot(root).render(
    <BrowserRouter>
      <AuthProvider>
        {/* <StrictMode> */}
        <App />
        {/* </StrictMode> */}
      </AuthProvider>
    </BrowserRouter>
  )
