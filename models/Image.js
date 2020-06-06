const mongoose = require('mongoose');

const NotePostSchema = new mongoose.Schema({
    creatorEmail: {type: String, required},
    courseCode: {type: String, required},
    courseNumber: {type: String, required},
    images: [String]
});
module.exports = mongoose.model('NotePost', NotePostSchema);