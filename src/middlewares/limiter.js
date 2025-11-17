// src/middlewares/limiter.js
const rateLimit = require('express-rate-limit');

// Ambil nilai batas dari process.env
const maxRequests = parseInt(process.env.RATE_LIMIT) || 20;

const limiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: maxRequests,
  message: { 
    status: "fail", 
    message: "Terlalu banyak request, coba lagi nanti."
  }
});

module.exports = limiterMiddleware;