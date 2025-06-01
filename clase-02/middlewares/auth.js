async function auth (req, res, next) {
  console.log('inside the middleware - auth function');
  next();
}

export default auth
