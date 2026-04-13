const isDemoMode = () => {
  // Check if MongoDB is connected
  const mongooseConnection = process.env.USE_DEMO_MODE === 'true';
  return mongooseConnection;
};

const demoModeMiddleware = (req, res, next) => {
  req.demoMode = isDemoMode();
  next();
};

export default demoModeMiddleware;
export { isDemoMode };
