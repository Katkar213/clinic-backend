const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    specialization: {
        type: String,
        required: [true, "Specialization is required"]
    },
    experience: {
        type: String,
        required: [true, "Experience is required"]
    },
    education: {
        type: String,
        required: [true, "Education is required"]
    }
}, { timestamps: true });

const DoctorsData = mongoose.model("Doctor",doctorSchema);

module.exports = DoctorsData ;
