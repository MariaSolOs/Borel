const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    URL: String
});
module.exports = mongoose.model('Image', ImageSchema);