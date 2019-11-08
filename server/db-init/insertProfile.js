var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var fs = require("fs");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "stocks";
var imageAsBase64 = fs.readFileSync(
  process.cwd() + "\\company_logos\\abbv.svg",
  "base64"
);
mongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");
  const dbo = db.db(dbName);
  // inserting image ,c ompany info and employee count in mongo database[piyush]
  try {
    var collection = dbo.collection("stocks_data");
    collection.updateOne(
      { ticker_name: "ABBV" },
      {
        $set: {
          employess: "30000",
          profile:
            "AbbVie Inc. (AbbVie) is a research-based biopharmaceutical company. The Company is engaged in the discovery, development, manufacture and sale of a range of pharmaceutical products. Its products are focused on treating conditions, such as chronic autoimmune diseases in rheumatology, gastroenterology and dermatology; oncology, including blood cancers; virology, including hepatitis C virus (HCV) and human immunodeficiency virus (HIV); neurological disorders, such as Parkinson's disease and multiple sclerosis; metabolic diseases, including thyroid disease and complications associated with cystic fibrosis, and other serious health conditions. It offers products in various categories, including HUMIRA (adalimumab), Oncology products, Virology Products, Additional Virology products, Metabolics/Hormones products, Endocrinology products and other products, which include Duopa and Duodopa (carbidopa and levodopa), Anesthesia products and ZINBRYTA (daclizumab).",

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
