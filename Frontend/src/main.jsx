import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WorkoutsContextProvider } from './Contexts/WorkoutsContext.jsx'
import { AuthContextProvider } from './Contexts/AuthContext.jsx'
// import { WorkoutsContextProvider } from './WorkoutsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
     <WorkoutsContextProvider>
    <App />
    </WorkoutsContextProvider>
    </AuthContextProvider>
  </StrictMode>
 
)
