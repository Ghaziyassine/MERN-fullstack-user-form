const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files', required: true }
});

const User = mongoose.model('User', userSchema);


module.exports = User;