// src/app.js (Kode Final Setelah Restrukturisasi)

require('dotenv').config(); 

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

const movieRoutes = require('./routes/movies.routes.js');

// Import Middlewares dari file terpisah
const loggerMiddleware = require('./middlewares/logger'); // Baru
const limiterMiddleware = require('./middlewares/limiter'); // Baru
const errorHandler = require('./middlewares/errorHandler'); // Sudah ada

// Middleware untuk membaca JSON dari body request
app.use(express.json());

// ===================================
// A. SECURITY MIDDLEWARE & LOGGING
// ===================================

// Logging (Menggunakan logger.js)
app.use(loggerMiddleware); // Mengganti app.use(morgan('combined'))

// Helmet & CORS
app.use(helmet()); 
app.use(cors({ origin: 'http://localhost:5173' })); 

// Rate Limiter (Menggunakan limiter.js)
app.use(limiterMiddleware); // Mengganti definisi rateLimit yang panjang

// ===================================
// B. ROUTES & MONITORING
// ===================================

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: "ok",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api', movieRoutes);

// ===================================
// C. GLOBAL ERROR HANDLER
// ===================================

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "Endpoint tidak ditemukan"
    });
});

// Global Error Handler harus berada paling akhir
app.use(errorHandler);

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});