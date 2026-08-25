import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './components/App'
import { BrowserRouter } from 'react-router-dom'
import { CurrentUserContextProvider } from './contexts/CurrentUserContext'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <CurrentUserContextProvider>
        <App />
      </CurrentUserContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
