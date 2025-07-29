const errorMiddleware = (err, req, res, next) => {  

    console.error('middleware: Error occurred:', req.url, err);
    res.status(500).json({ error: 'Internal Server Error by the middleware!!!' });
    next();
 };

 export default errorMiddleware;
