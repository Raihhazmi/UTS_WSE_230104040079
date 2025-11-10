// src/app.js

const express = require('express');
const app = express();
const port = 3000; // Port default sesuai soal [cite: 52]
const apiRouter = require('./routes/movies.routes.js');

// Middleware untuk membaca JSON dari body request
app.use(express.json());

// Menggunakan router untuk semua request yang diawali dengan /api
app.use('/api', apiRouter);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});