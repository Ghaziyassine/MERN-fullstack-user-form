import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import mongoose from 'mongoose';
import conn from '../config/db.js';
import Grid from 'gridfs-stream';

// Ensure GridFS uses the correct MongoDB driver
Grid.mongo = mongoose.mongo;

let gfs;
conn.once('open', () => {
  gfs = new Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/yassine",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

export default upload;
export { gfs };
