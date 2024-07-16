
// File model
import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    strict: false, 
    collection: 'uploads.files' 
  }
);

const File = mongoose.model('File', FileSchema);
export default File;