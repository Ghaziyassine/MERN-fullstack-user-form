import { Types, mongo } from 'mongoose';
import conn from '../config/db.js';

export const getImageById = async (req, res) => {
  try {
    const fileId = new Types.ObjectId(req.params.id);

    const bucket = new mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads'
    });

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', (err) => {
      console.error(err);
      res.status(404).json({ error: 'File not found' });
    });

    downloadStream.on('end', () => {
      res.end();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
