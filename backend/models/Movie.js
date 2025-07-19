const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    cast: [{
        type: String,
        required: true
    }],
    genre: [{
        type: String,
        enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Animation']
    }],
    language: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    trailerUrl: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);