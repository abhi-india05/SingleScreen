const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    amenities: [{
        type: String,
        enum: ['parking', 'food_court', 'wheelchair', '3d', 'dolby']
    }],
    totalScreens: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Theatre', theatreSchema);