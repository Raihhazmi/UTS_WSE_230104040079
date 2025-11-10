// src/routes/movies.routes.js

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movies.controller.js');

// Endpoint untuk info service
router.get('/info', movieController.getApiInfo);

// Endpoint untuk resource 'movies'
router.get('/movies', movieController.getAllMovies);
router.post('/movies', movieController.createMovie);
router.get('/movies/:id', movieController.getMovieById);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

module.exports = router;