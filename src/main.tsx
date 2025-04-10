import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import {store} from './store/index.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </BrowserRouter>
    </StrictMode>,
)
