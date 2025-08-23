// Load environment variables from .env file
require('dotenv').config()

const http = require('http')
const findAvailablePort = require('./10.free-port.js')

// Use environment variable with fallback
const port = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Request received:', req.method, req.url)
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello, World!\n')
})

// server.listen(0, () => {
//   console.log(`Server is running on http://localhost:3010', ${server.address().port}`)
// })

findAvailablePort(port).then(port => {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
})
