const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gokulakondagautham2002:z22NBm4qN53oOEn7@cluster0.o2rec.mongodb.net/devTinder"
  );
  // To the connection string if we add db name, it then directly connects to the database not the cluster
};

// connectDB()
//   .then(() => {
//     console.log("database connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = connectDB;
