const express = require("express");
const router = express.Router();
const url = "mongodb://localhost:27017/";
var MongoClient = require("mongodb").MongoClient;

//geting all search results from database - Harshal
router.post("/search", async (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("headstocks");
    dbo
      .collection("companies")
      .find({ ticker: req.body.searchInput })
      .toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        res.status(200).json({
          status: 200,
          data: result,
          message: "Retrieved Search Resultsuccessfully"
        });
        db.close();
      });
  });
});
module.exports = router;

// Reference for Like Operator in Mongo and ignoring cases where $regex matches pattern character by character and option i ignores the case
// router.get("/search", async (req, res) => {
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("stocks");
//     var user_value = req.body.search_value;
//     dbo
//       .collection("stocks")
//       .find(
//         { tname: { $regex: user_value, $options: "i" } },
//         { tdate: 0, tname: 1, sector: 1 }
//       )
//       .toArray(function(err, result) {
//         if (err) throw err;
//         res.status(200).json({
//           status: 200,
//           data: result,
//           message: "Retrieved Ticker Sucessfully"
//         });
//         db.close();
//       });
//   });
// });
