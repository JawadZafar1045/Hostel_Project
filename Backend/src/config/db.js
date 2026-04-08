const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const conn = await mongoose.connect(env.MONGO_URI);
      console.log(`\n✅ MongoDB Connected: ${conn.connection.host}\n`);
      return;
    } catch (error) {
      retries++;
      console.error(`❌ MongoDB Connection Error (Attempt ${retries}/${maxRetries}):`, error.message);
      
      if (retries < maxRetries) {
        console.log('🔄 Retrying in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error('💥 Max retries reached. Exiting...');
        process.exit(1);
      }
    }
  }
};

module.exports = connectDB;
