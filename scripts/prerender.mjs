// Bakes each route's HTML into dist/ so search engines and AI crawlers that don't run JS see the full page.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import fs from 'node:fs'
import { render } from '../dist-ssr/entry-server.js'

const routes = { '/': 'dist/index.html', '/news': 'dist/news.html' }
const template = fs.readFileSync('dist/index.html', 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('dist/index.html is missing the <!--app-html--> marker')

// Replace an attribute value (or the title text) in the template head
const setHead = (html, re, value) => (value === undefined ? html : html.replace(re, (_, pre) => pre + value))

for (const [url, file] of Object.entries(routes)) {
  let app = render(url)
  const pick = re => app.match(re)?.[1]
  const title = pick(/<title>([\s\S]*?)<\/title>/)
  const desc = pick(/<meta name="description" content="([^"]*)"/)
  const canonical = pick(/<link rel="canonical" href="([^"]*)"/)
  if (!title || !desc || !canonical) throw new Error(`${url}: page must render <title>, description and canonical`)

  // React emits route metadata inline; it belongs in <head> only
  app = app.replace(/<title>[\s\S]*?<\/title>|<meta name="description"[^>]*>|<link rel="canonical"[^>]*>/g, '')

  let html = template
  html = setHead(html, /(<title>)[\s\S]*?(?=<\/title>)/, title)
  for (const attr of ['name="description"', 'property="og:description"', 'name="twitter:description"'])
    html = setHead(html, new RegExp(`(<meta ${attr}\\s+content=")[^"]*`), desc)
  for (const attr of ['property="og:title"', 'name="twitter:title"'])
    html = setHead(html, new RegExp(`(<meta ${attr} content=")[^"]*`), title)
  html = setHead(html, /(<link rel="canonical" href=")[^"]*/, canonical)
  html = setHead(html, /(<meta property="og:url" content=")[^"]*/, canonical)

  fs.writeFileSync(file, html.replace('<!--app-html-->', () => app))
  console.log(`prerendered ${url} -> ${file} (${(html.length / 1024).toFixed(0)} kB template, ${(app.length / 1024).toFixed(0)} kB app)`)
}

fs.rmSync('dist-ssr', { recursive: true, force: true })
