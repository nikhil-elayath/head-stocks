const express = require("express");
const router = express.Router();
var result;

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "headstocks";

//Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  router.get("/all", async (req, response) => {
    try {
      var collection = db.collection("CompanyDetails");

      //fetching the data from the collectoin and converting them into an array
      collection.find().toArray(function(err, items) {
        // storing the data which is present in items into a variable result
        result = items;
        console.log("Printing result", result);
        response.status(200).json({
          status: 200,
          //passing result
          data: result,
          message: "Company Details retreived successfully",
        });
      });
    } catch (err) {
      console.log(err);
    }
  });
  //balance sheet
  router.get("/balancesheet", async (req, response) => {
    try {
      var collection = db.collection("CompanyDetails");

      //fetching the data from the collectoin and converting them into an array
      collection.find().toArray(function(err, items) {
        // storing the data which is present in items into a variable result
        result = items;
        console.log("Printing result", result);
        response.status(200).json({
          status: 200,
          //passing result
          data: result,
          message: "Company Details retreived successfully",
        });
      });
    } catch (err) {
      console.log(err);
    }
  });
  //closing the connect method
});

module.exports = router;
