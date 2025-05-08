import { createServer } from 'http'
import { console } from 'inspector'

const port = process.env.PORT || 3010

const server = createServer((req, res) => {
  console.log('Request received:')
  res.end('Hello World')
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
