const app = require('./src/app');
const connectDB = require('./src/config/db');
const env = require('./src/config/env');

/**
 * @description Bootstrap and start the server.
 */
const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'your_mongodb_uri_here') {
      connectDB();
    } else {
      console.log('MongoDB URI not found or placeholders used. Skipping database connection for now...');
    }


    // 2. Start Express App
    const PORT = env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`
🚀 Server is flying on port ${PORT}
🌍 Environment: ${env.NODE_ENV}
      `);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
