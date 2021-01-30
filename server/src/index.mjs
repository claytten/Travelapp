import mongoose from 'mongoose';
import app from './app.mjs';
import config from './config/index.mjs';
import logger from './config/logger.mjs';
import { syncLink } from './utils/syncLink.mjs';

let server;
syncLink();
logger.info('✌️ Storage Sync loaded');

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('✌️ DB loaded and connected!');
  server = app.listen(config.port, () => {
    logger.info('✌️ Express loaded');
    logger.info(`🛡️  Server listening on port: ${config.port} 🛡️`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
