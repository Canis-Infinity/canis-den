import assert from 'node:assert/strict'

// Run against a production build: node scripts/check-pwa.mjs http://localhost:7342
const base = process.argv[2] || 'http://localhost:7342'
const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1'
for (const path of ['/general?lang=zh-TW', '/work?lang=en', '/after-dark?lang=zh-TW']) {
  const response = await fetch(new URL(path, base), { headers: { 'User-Agent': userAgent } })
  assert.equal(response.status, 200, path)
  const html = await response.text()
  const head = html.split('</head>')[0]
  assert.match(head, /<link[^>]*rel="manifest"[^>]*href="\/manifest.webmanifest"/, `${path}: manifest must be in initial head`)
  assert.match(head, /<meta[^>]*name="mobile-web-app-capable"[^>]*content="yes"/, `${path}: standalone metadata`)
  assert.match(head, /<link[^>]*rel="apple-touch-icon"/, `${path}: installation icon`)
  console.log('PASS initial installation metadata', path)
}
const response = await fetch(new URL('/manifest.webmanifest', base))
assert.equal(response.status, 200)
const manifest = await response.json()
assert.equal(manifest.scope, '/')
assert.equal(manifest.display, 'standalone')
assert.equal(manifest.id, '/')
const worker = await fetch(new URL('/sw.js', base))
assert.equal(worker.status, 200)
assert.match(worker.headers.get('content-type'), /javascript/)
console.log('PASS manifest scope and service worker')
