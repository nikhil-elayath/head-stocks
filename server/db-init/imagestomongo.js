var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var fs = require("fs");

var url = "mongodb://localhost:27017/headStocks";

mongoClient.connect(url, function(err, db) {
  if (err) {
    console.log("Sorry unable to connect to MongoDB Error:", err);
  } else {
    var bucket = new mongodb.GridFSBucket(db, {
      chunkSizeBytes: 1024,
      bucketName: "images"
    });

    fs.createReadStream(
      "C:UserskinngDesktopcapstone2headstocksserverdb-init\newsimage\1.jpg"
    )
      .pipe(bucket.openUploadStream("1.jpg"))
      .on("error", function(error) {
        console.log("Error:-", error);
      })
      .on("finish", function() {
        console.log("File Inserted!!");
        process.exit(0);
      });
  }
});
