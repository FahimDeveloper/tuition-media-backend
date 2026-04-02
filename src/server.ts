import mongoose from 'mongoose';
import http from 'http';
import config from './app/config';
import { app } from './app';

const port = config.port;
const server = http.createServer(app);

export const onlineUsers = new Map<string, string>();

// Database connection
async function dbConnection() {
  const url = config.database_url;
  try {
    await mongoose.connect(url as string);
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}
dbConnection();

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception detected:', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection detected:', reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
