const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
    },
    githubUrl: {
        type: String,
        required: true
    },
    siteUrl: {
        type: String,
        required: true
    },
    techStacks: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);