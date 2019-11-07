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
  router.get("/:id", async (req, res, next) => {
    try {
      let id = req.params.id;
      console.log("printing id from api all", id);
      var collection = db.collection("stocks");
      collection.findOne({ _id: +id }, function(err, result) {
        if (!result) {
          return res.status(400).send({ message: "No data found" });
        } else {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            data: result,
            message: "Retrieved news Successfully",
          });
        }
      });
    } catch (err) {
      next(err);
    }
  });

  //balance sheet
  // router.get("/balancesheet", async (req, response) => {
  //   try {
  //     var collection = db.collection("BalanceSheet");

  //     //fetching the data from the collectoin and converting them into an array
  //     collection.find().toArray(function(err, items) {
  //       // storing the data which is present in items into a variable result
  //       result = items;
  //       // console.log("Printing result", result);
  //       response.status(200).json({
  //         status: 200,
  //         //passing result
  //         data: result,
  //         message: "Balance Sheet Details retreived successfully",
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  //getting cash flow

  router.get("/financial/:id", async (req, res, next) => {
    try {
      let id = req.params.id;
      console.log("printing id from api all", id);
      var collection = db.collection("stocks");
      collection.findOne({ _id: +id }, function(err, result) {
        if (!result) {
          return res.status(400).send({ message: "No data found" });
        } else {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            data: result,
            message: "Retrieved news Successfully",
          });
        }
      });
    } catch (err) {
      next(err);
    }
  });

  //for analysis
  router.get("/analysis/:id", async (req, res, next) => {
    try {
      let id = req.params.id;
      console.log("printing id from api all", id);
      var collection = db.collection("stocks");
      collection.findOne({ _id: +id }, function(err, result) {
        if (!result) {
          return res.status(400).send({ message: "No data found" });
        } else {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            data: result,
            message: "Retrieved news Successfully",
          });
        }
      });
    } catch (err) {
      next(err);
    }
  });

  //getting profit and loss
  // router.get("/cashflow", async (req, response) => {
  //   try {
  //     var collection = db.collection("ProfitAndLoss");
  //     collection.find().toArray(function(err, items) {
  //       result = items;
  //       // console.log("Printing result", result);
  //       response.status(200).json({
  //         status: 200,
  //         //passing result
  //         data: result,
  //         message: "Profit and loss Details retreived successfully",
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  //closing the connect method
});

module.exports = router;
