var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var fs = require("fs");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "headstock";
var imageAsBase64 = fs.readFileSync(
  process.cwd() + "\\newsimage\\1.jpg",
  "base64"
);
console.log(imageAsBase64);
mongoClient.connect(url, function(err, db) {
  if (err) {
    console.log("Sorry unable to connect to MongoDB Error:", err);
  } else {
    console.log("Connected successfully to server");
    const db = db.db(dbName);
    try {
      var collection = db.collection("news");
      collection.update(
        { _id: 100 },
        {
          $set: {
            news_image: imageAsBase64
          }
        }
      );
      console.log("Image Inserted");
    } catch (err) {
      console.log(err);
    }
  }
});
