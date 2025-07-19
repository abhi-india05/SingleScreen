const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
        required: true
    },
    seats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
        required: true
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'net_banking', 'upi', 'wallet'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    transactionId: {
        type: String
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    qrCode: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);