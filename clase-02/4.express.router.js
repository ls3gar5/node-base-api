import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware.js'
import auth from './middlewares/auth.js';
import logger from './middlewares/logger.js';
import router from './routes/routes.js';

const app = express();
const port = process.env.PORT || 3000

// Middleware to parse JSON and URL-encoded payloads
app.disable('x-powered-by')

app.use(express.json());
// Application-level middleware to parse URL-encoded data
app.use(auth);
app.use('/test',router);
app.use(errorMiddleware);

app.get('/v1/logger', auth, logger, (req, res) => {
  res.status(200).json({ message: 'This is a test log route' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
