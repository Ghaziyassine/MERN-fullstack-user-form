const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({}, { 
    strict: false, 
    collection: 'uploads.files' 
});

const File = mongoose.model('uploads.files', fileSchema);
module.exports = File;