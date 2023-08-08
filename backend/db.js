const mongoose= require('mongoose')
const mongo_uri = "mongodb+srv://rishabh16048:Boka952008@cluster0.mschisz.mongodb.net/"

const connect_to_mongo = async () => {
    await mongoose.connect(mongo_uri);
    console.log("Connected to MongoDB");
  };

module.exports = connect_to_mongo