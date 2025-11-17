// src/middlewares/errorHandler.js

module.exports = (err, req, res, next) => {
  console.error(err.stack); // Cetak stack trace error ke console server [cite: 90]
  res.status(err.status || 500).json({ // Ambil status code dari error atau default 500 [cite: 91]
    status: "error",
    message: err.message || "Internal Server Error" // Pesan error default [cite: 93]
  });
};