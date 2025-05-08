const { createServer } = require('http')
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404 // Not Found
          res.setHeader('Content-Type', 'text/httml; charset=utf-8')
          return res.end('404 Not Found')
      }
    case 'POST':
      switch (url) {
        case '/pokemon':
          // eslint-disable-next-line no-case-declarations
          let bodyData = ''
          req.on('data', chunk => {
            bodyData += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(bodyData)
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(data))
          })
          break
      }
      break
    case 'PUT':
      switch (url) {
        case '/update':
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ message: 'Resource updated successfully!' }))
        default:
          break
      }
      break
    case 'DELETE':
      switch (url) {
        case '/delete':
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ message: 'Resource deleted successfully!' }))
        default:
          break
      }
      break
    default:
      res.statusCode = 405 // Method Not Allowed
      res.setHeader('Content-Type', 'text/plain')
      return res.end('Method Not Allowed')
  }
}

const server = createServer(processRequest)

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
