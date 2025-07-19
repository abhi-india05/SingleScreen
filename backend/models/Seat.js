const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre",
        required: true
    },
    balcony: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Balcony"
    },
    row: {
        type: Number,
        required: true
    },
    col: {
        type: Number,
        required: true
    },
    seatType: {
        type: String,
        enum: ['normal', 'premium', 'VIP'],
        default: 'normal'
    },
    price: {
        type: Number,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show"
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

seatSchema.index({ theatre: 1, show: 1, seatNumber: 1 }, { unique: true });

module.exports = mongoose.model('Seat', seatSchema);