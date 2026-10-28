import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </StrictMode>
)

// Production pages are prerendered (scripts/prerender.mjs); the dev server serves an empty root
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
