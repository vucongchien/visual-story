import app from './app';
import config from './config';

const startServer = () => {
  app.listen(config.port, () => {
    console.log(`🚀 Server is running on http://localhost:${config.port}`);
  });
};

startServer();