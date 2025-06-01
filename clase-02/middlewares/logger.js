const logger = async (req, res, next) => {
    console.log('logger middleware');
    const { method, url } = req;
    const message = `Received a ${method} request to ${url}`;
    console.log(message);
    next();
}

export default logger;