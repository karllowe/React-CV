import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import GeneralInfo from './components/General_info.jsx'
import {EducationSection} from './src/components/Education.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GeneralInfo />
    <EducationSection />
  </StrictMode>
)
