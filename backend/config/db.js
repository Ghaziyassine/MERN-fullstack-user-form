import mongoose from 'mongoose';

const dbURI = "mongodb://127.0.0.1:27017/yassine";

const conn = mongoose.createConnection(dbURI);

mongoose.connect(dbURI)
  .then(() => {
    console.log("You are connected to the database");
  }).catch((err) => {
    console.log("Connection failed: ", err);
  });

export default conn;
