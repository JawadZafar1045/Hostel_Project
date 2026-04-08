const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');

const app = express();

// ─── Security Headers ───
app.use(helmet());

// ─── CORS ───
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// ─── Request Logging ───
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Body Parsers ───
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Cookie Parser ───
app.use(cookieParser());

// ─── Global Rate Limiter (100 req/15min per IP) ───
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', globalLimiter);

// ─── Health Check ───
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// ─── Routes (will be mounted in subsequent steps) ───
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/owner', ownerRoutes);
// app.use('/api/public', publicRoutes);

// ─── 404 Handler ───
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

const errorMiddleware = require('./middlewares/error.middleware');

// ─── Global Error Handler ───
app.use(errorMiddleware);

module.exports = app;
