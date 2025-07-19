const mongoose = require('mongoose');

const balconySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre",
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    col: {
        type: Number,
        required: true
    },
    priceMultiplier: {
        type: Number,
        default: 1.0
    }
}, { timestamps: true });

module.exports = mongoose.model('Balcony', balconySchema);