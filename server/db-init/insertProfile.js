var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var fs = require("fs");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "stocks";
var imageAsBase64 = fs.readFileSync(
  process.cwd() + "\\company_logos\\pharma_image\\JNJ.png",
  "base64"
);
mongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");
  const dbo = db.db(dbName);
  // inserting image ,c ompany info and employee count in mongo database[piyush]
  try {
    var collection = dbo.collection("stocks_data_2");
    collection.updateOne(
      { ticker_name: "JNJ" },
      {
        $set: {
          employess: "135100",
          profile:
            "Johnson & Johnson is a holding company, which is engaged in the research and development, manufacture and sale of a range of products in the healthcare field. It operates through three segments: Consumer, Pharmaceutical and Medical Devices. Its primary focus is products related to human health and well-being. The Consumer segment includes a range of products used in the baby care, oral care, skin care, over-the-counter pharmaceutical, women's health and wound care markets. The Pharmaceutical segment is focused on five therapeutic areas, including immunology, infectious diseases, neuroscience, oncology, and cardiovascular and metabolic diseases. The Medical Devices segment includes a range of products used in the orthopedic, surgery, cardiovascular, diabetes care and vision care fields. Its research facilities are located in the United States, Belgium, Brazil, Canada, China, France, Germany, India, Israel, Japan, the Netherlands, Singapore, Switzerland and the United Kingdom.",
          ticker_logo: imageAsBase64
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
