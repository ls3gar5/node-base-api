import { Router } from 'express';
import dittoJSON from '../pokemon/ditto.json' with { type: "json" }
import logger from '../middlewares/logger.js'

const router = Router();

// midleware AUTH
router.use('/', async (req, res, next) => {
  if (req.method === 'GET') {
    console.log('First to run - midleware request received')
  } else if (req.method === 'POST') {
    const body = req.body
    console.log('POST', body)
  }
  next()
})

router.get('/', (req, res) => {
  console.log(`${req.method}/`);
  res.status(200).send('<h1>Hello World!</h1>')
});

router.get('/error', (req, res) => {
  console.log(`${req.method}/`);
  throw error('This is a simulated error for the TRY block');
});

// router-level middleware for logging
router.get('/pokemon/ditto', logger, (req, res) => {
  res.status(200).json(dittoJSON)
});

router.post('/pokemon', (req, res) => {
  res.status(201).json(dittoJSON)
});

// This is a catch-all route and send for 404 Not Found
router.use((req, res) => {
  res.status(404).send('404 Not Found!!!!')
});

export default router;