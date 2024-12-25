const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatno: {
        type: String,
        required: true
    },
    isbooked: {
        type: Boolean,
        required: true
    },
    booked_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        validate: {
            validator: function (v) {
                // Check if 'isbooked' is true, then 'booked_user' must be provided
                if (this.isbooked && !v) {
                    return false; // Invalid if 'isbooked' is true but 'booked_user' is missing
                }
                // If 'isbooked' is false, 'booked_user' must be null or undefined
                if (!this.isbooked && v) {
                    return false; // Invalid if 'isbooked' is false but 'booked_user' is provided
                }
                return true; // Otherwise, valid
            },
            message: "Invalid user assignment based on booking status!"
        }
    }
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
