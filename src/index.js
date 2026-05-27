import express from 'express';
import dotenv from 'dotenv';
import { logger } from './logging/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    ip: req.ip,
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  logger.info('Health check', { status: 'ok' });
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Digital Products endpoint (placeholder)
app.get('/api/v1/digital-products', (req, res) => {
  logger.info('Fetching digital products');
  res.json({ items: [], total: 0 });
});

// Logging endpoint (placeholder)
app.get('/api/v1/logs/entry-points', (req, res) => {
  logger.info('Fetching entry point logs');
  res.json({ logs: [], total: 0 });
});

// Sync endpoint (placeholder)
app.post('/api/v1/sync/trigger', (req, res) => {
  logger.info('Sync triggered manually');
  res.status(202).json({ sync_id: 'sync-' + Date.now(), status: 'pending' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server started`, { port: PORT, environment: process.env.NODE_ENV });
});
