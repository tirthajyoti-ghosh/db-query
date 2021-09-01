const { Schema } = require('mongoose');

module.exports = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    format: {
        type: String,
        required: true,
    },
    sizeInKB: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    folder: {
        type: String,
        required: [() => this.subFolder, 'Folder MUST be mentioned if inserting in a sub folder'], // folder MUST be mentioned if subFolder is mentioned
    },
    subFolder: {
        type: String,
        required: false,
    },
}, { timestamps: true });
