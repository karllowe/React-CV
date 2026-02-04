import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import GeneralInfo from './components/General_info.jsx'
import {EducationSection} from '/src/components/Education.jsx'
import {JobsSection} from '/src/components/Jobs.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GeneralInfo />
    <JobsSection />
    <EducationSection />
  </StrictMode>
)
