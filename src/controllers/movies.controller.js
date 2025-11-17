// code masih waras
// src/controllers/movies.controller.js

let movies = require('../data/movies.data.js');

// GET /api/info
exports.getApiInfo = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "API Service for UTS Web Service Engineering",
        author: "Muhammad Raihan Azmi", // Ganti dengan namamu
        nim: "230104040079",
    });
};

// GET /api/movies
exports.getAllMovies = (req, res) => {
    res.status(200).json({
        status: "success",
        data: movies,
    });
};

// GET /api/movies/:id
exports.getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(m => m.id === id);

    if (!movie) {
        return res.status(404).json({
            status: "fail",
            message: `Film dengan ID ${id} tidak ditemukan`,
        });
    }

    res.status(200).json({
        status: "success",
        data: movie,
    });
};

// POST /api/movies
exports.createMovie = (req, res) => {
    const { title, genre, year } = req.body;

    // Validasi input [cite: 34, 69]
    if (!title || !genre) {
        return res.status(400).json({
            status: "fail",
            message: "Field 'title' dan 'genre' wajib diisi",
        });
    }

    const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
    const newMovie = {
        id: newId,
        title,
        genre,
        year: year || new Date().getFullYear(),
    };

    movies.push(newMovie);

    res.status(201).json({ // 201 Created 
        status: "success",
        message: "Data film berhasil dibuat",
        data: newMovie,
    });
};

// PUT /api/movies/:id
exports.updateMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({
            status: "fail",
            message: `Film dengan ID ${id} tidak ditemukan`,
        });
    }

    const { title, genre, year } = req.body;
    if (!title || !genre) {
        return res.status(400).json({
            status: "fail",
            message: "Field 'title' dan 'genre' wajib diisi",
        });
    }

    const updatedMovie = { ...movies[movieIndex], title, genre, year: year || movies[movieIndex].year };
    movies[movieIndex] = updatedMovie;

    res.status(200).json({
        status: "success",
        message: "Data film berhasil diperbarui",
        data: updatedMovie,
    });
};

// DELETE /api/movies/:id
exports.deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({
            status: "fail",
            message: `Film dengan ID ${id} tidak ditemukan`,
        });
    }

    movies.splice(movieIndex, 1);

    res.status(204).send(); // 204 No Content 
};