import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import ColorModeSelect from './component/ColourModeSelect.jsx'

createRoot(document.getElementById('root')).render(
  <ColorModeSelect><App /></ColorModeSelect>
    
  
)
