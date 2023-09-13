import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { DarkModeContextProvider } from './context/DarkModeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Router>
        <App />
        <Toaster />
      </Router>
    </DarkModeContextProvider>
  </React.StrictMode>,
)
