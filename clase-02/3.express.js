import express from 'express';
import auth  from './middlewares/auth.js'
import dittoJSON from './pokemon/ditto.json' assert { type: "json" }
const app = express()

const port = process.env.PORT || 3000

// Middleware to parse JSON and URL-encoded payloads
app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// midleware AUTH
app.use('/', async (req, res, next) => {
  if (req.method === 'GET') {
    console.log('GET reuqest')
    await auth()
  } else if (req.method === 'POST') {
    const body = req.body
    console.log('POST', body)
  }
  next()
})

app.get('/', (req, res) => {
  console.log('GET /')
  res.status(200).send('<h1>Hello World!</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.status(200).json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(dittoJSON)
})

// This is a catch-all route for 404 Not Found
app.use((req, res) => {
  res.status(404).send('404 Not Found')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
