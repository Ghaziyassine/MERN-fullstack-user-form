import User from '../models/User.js';
import File from '../models/File';
import conn from '../config/db.js';

import { gfs } from '../middlewares/upload.js';

export const createUser = async (req, res) => {
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
};

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().populate('photo'); // Correct usage of find method
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('photo');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const fileId = user.photo;
    await gfs.files.deleteOne({ _id: fileId });
    await conn.db.collection('uploads.chunks').deleteMany({ files_id: fileId });

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    let photoId;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.file) {
      const oldFileId = user.photo;
      await gfs.files.deleteOne({ _id: oldFileId });
      await conn.db.collection('uploads.chunks').deleteMany({ files_id: oldFileId });
      photoId = req.file.id;
    } else {
      photoId = user.photo;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.photo = photoId;

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
