const mongoose = require('mongoose');

export interface ICV {
    candidate_id: string;
    name: string;
    email: string;
    experience?: string;
    education?: string;
    skills?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const cvSchema = new mongoose.Schema({
    candidate_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    experience: { type: String },
    education: { type: String },
    skills: { type: [String] } 
}, { 
    timestamps: true 
});

const CV = mongoose.model('CV', cvSchema);

module.exports = CV;