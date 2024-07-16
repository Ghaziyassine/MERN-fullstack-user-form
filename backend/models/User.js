// User model
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true }
});

const User = mongoose.model('User', UserSchema);
export default User;