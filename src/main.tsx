import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import './styles/globalStyles.css'
import SideBarMenu from './components/SideBarMenu'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SideBarMenu/>
    <Home/>
  </StrictMode>,
)
