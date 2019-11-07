const express = require("express");
const router = express.Router();
const url = "mongodb://localhost:27017/";
var MongoClient = require("mongodb").MongoClient;

//geting all news from database - Piyush kumar
router.get("/allnews", async (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("headstock");
    dbo
      .collection("news")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        res.status(200).json({
          status: 200,
          data: result,
          message: "Retrieved all news Successfully"
        });
        db.close();
      });
  });
});

//geting news details with an id - Piyush kumar
router.get("/singleNews/:id", async (req, res, next) => {
  MongoClient.connect(url, function(err, db) {
    try {
      let id = req.params.id;
      var dbo = db.db("headstock");
      dbo.collection("news").findOne({ new_id: +id }, function(err, result) {
        if (!result) {
          return res.status(400).send({ message: "News not found" });
        } else {
          if (err) throw err;

          //   console.log(result);
          res.status(200).json({
            status: 200,
            data: result,
            message: "Retrieved news Successfully"
          });
          db.close();
        }
      });
    } catch (err) {
      next(err);
    }
  });
});

router.get("/index", async (req, res) => {
  console.log("INdices");
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("headStocks");
    dbo
      .collection("index")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        res.status(200).json({
          status: 200,
          data: result,
          message: "Retrieved all news Successfully"
        });
        db.close();
      });
  });
});

router.get("/search", async (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("stocks");
    var user_value = req.body.search_value;
    dbo
      .collection("stocks")
      .find(
        { tname: { $regex: user_value, $options: "i" } },
        { tdate: 0, tname: 1, sector: 1 }
      )
      .toArray(function(err, result) {
        if (err) throw err;
        res.status(200).json({
          status: 200,
          data: result,
          message: "Retrieved Ticker Sucessfully"
        });
        db.close();
      });
  });
});

module.exports = router;
