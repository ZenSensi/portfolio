import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

// Used only at build time by scripts/prerender.mjs
export const render = (url: string) => renderToString(
  <StaticRouter location={url}>
    <App />
  </StaticRouter>,
)
