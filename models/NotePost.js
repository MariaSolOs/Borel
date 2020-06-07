const mongoose = require('mongoose');

const NotePostSchema = new mongoose.Schema({
    creatorEmail: {type: String, required: true},
    courseCode: {type: String, required: true},
    courseNumber: {type: String, required: true},
    images: [String]
});
module.exports = mongoose.model('NotePost', NotePostSchema);