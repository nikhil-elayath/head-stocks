/*piyush*/
var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var fs = require("fs");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "headstock";
// converting image tp base 64 foe storing in mongod[piyush]
var imageAsBase64 = fs.readFileSync(
  process.cwd() + "\\newsimage\\10.jpeg",
  "base64"
);
mongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");
  const dbo = db.db(dbName);
  try {
    var collection = dbo.collection("news");
    collection.updateOne(
      { new_id: 10 },
      {
        $set: {
          news_image: imageAsBase64
        }
      },
      { upsert: true }
    );
    console.log("Image Inserted");
    db.close();
  } catch (err) {
    console.log(err);
  }
});
