import { createServer } from 'http'
import fs from 'fs'

const port = process.env.PORT || 3010

const processRequest = async (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Hello from pépe API LEO html</h1>')
  } else if (req.url === '/contact') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ message: 'Contact pépe API LEO 1' }))
  } else if (req.url === '/bart.jpeg') {
    res.setHeader('Content-Type', 'image/jpeg')

    // fs.readFile('./bart.jpeg', (err, data) => {
    //   if (err) {
    //     res.statusCode = 500
    //     res.setHeader('Content-Type', 'text/html; charset=utf-8')
    //     res.end('<h1>500 Internal Server Error</h1>')
    //   } else {
    //     res.end(data)
    //   }
    // })

    try {
      const data = await fs.readFileSync('./bart.jpeg')
      res.end(data)
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end('<h1>500 Internal Server Error</h1>')
    }
  } else if (req.url === '/api/leo') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ message: 'API pépe API LEO leo' }))
  } else if (req.url === '/api/leo/1') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ message: 'API pépe API LEO leo 1' }))
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>404 Not Found</h1>')
  }
}

const server = createServer(processRequest)

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
