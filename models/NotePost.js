const mongoose = require('mongoose');

const NotePostSchema = new mongoose.Schema({
    institution: {type: String, required: true},
    course: {type: String, required: true},
    images: [String],
    creatorEmail: {type: String, required: true},
});
module.exports = mongoose.model('NotePost', NotePostSchema);