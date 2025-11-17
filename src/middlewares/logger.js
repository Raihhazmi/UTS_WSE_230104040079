// src/middlewares/logger.js
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Buat stream untuk logging ke file access.log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'logs', 'access.log'),
  { flags: 'a' } // 'a' artinya append (menambahkan)
);

// Middleware logger menggunakan format 'combined'
const loggerMiddleware = morgan('combined', { stream: accessLogStream });

module.exports = loggerMiddleware;