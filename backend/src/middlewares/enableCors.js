const enableCors = (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

module.exports = enableCors;
