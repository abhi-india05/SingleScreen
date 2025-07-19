const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    phone: {
        type: String,
        match: [/^[0-9]{10}$/, 'is invalid']
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    }],
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);