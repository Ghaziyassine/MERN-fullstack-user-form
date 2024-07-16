import express, { json } from 'express';
import { createConnection, connect, mongo, Types } from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import cors from 'cors';
import File from './models/File';
import User from './models/User'; // Import User model correctly

// Create an instance of Express
const app = express();              

// Middleware to parse JSON bodies
app.use(json());
app.use(cors());

// MongoDB URL
const dbURI = "mongodb://127.0.0.1:27017/yassine";

// Create a MongoDB connection
const conn = createConnection(dbURI);

// Connection to MongoDB
connect(dbURI)
  .then(() => {
    console.log("You are connected to the database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }).catch((err) => {
    console.log("Connection failed: ", err);
  });

// Init gfs
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: dbURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads' // Ensure this matches your bucket name
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route to upload files and create a user
app.post('/api/users/', upload.single('file'), async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const photoId = req.file.id;

    const newUser = new User({
      name,
      email,
      photo: photoId
    });

    await newUser.save();

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get all users
app.get('/api/users/', async (req, res) => {
  try {
    const users = await User.find().populate('photo'); // Correct usage of find method
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('photo'); // Correct usage of findById method

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); // Correct usage of findById method
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Delete the associated file and chunks
    const fileId = user.photo;
    await gfs.files.deleteOne({ _id: fileId });
    await conn.db.collection('uploads.chunks').deleteMany({ files_id: fileId });

    // Delete user
    await User.findByIdAndDelete(id); // Correct usage of findByIdAndDelete method

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get image by ID
app.get('/api/image/:id', async (req, res) => {
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
});

// Update user by ID
app.put('/api/users/:id', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    let photoId;

    // Find the existing user
    const user = await User.findById(id); // Correct usage of findById method
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If a new file is uploaded, delete the old file and update with the new one
    if (req.file) {
      // Delete the old file
      const oldFileId = user.photo;
      await gfs.files.deleteOne({ _id: oldFileId });
      await conn.db.collection('uploads.chunks').deleteMany({ files_id: oldFileId });

      // Save the new file ID
      photoId = req.file.id;
    } else {
      // Keep the existing photo ID if no new file is uploaded
      photoId = user.photo;
    }

    // Update the user's details
    user.name = name || user.name;
    user.email = email || user.email;
    user.photo = photoId;

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
