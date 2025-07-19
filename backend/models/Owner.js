const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
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
        required: true,
        match: [/^[0-9]{10}$/, 'is invalid']
    },
    theatres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre"
    }]
}, { timestamps: true });

module.exports = mongoose.model('Owner', ownerSchema);