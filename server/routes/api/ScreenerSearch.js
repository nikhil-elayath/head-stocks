const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "stocks";
const stocksData = require("../../model/stocksModel");

router.post("/screener", async (req, res, next) => {
  console.log("body", req.body);
  const value1 = req.body.value1;
  const value2 = req.body.value2;
  // console.log("values", value1, value2);
  // console.log("screener search api called");
  const search_result = [];
  try {
    let result = await stocksData
      .find({
        "ticker_dates.Dividends": { $gt: +value1, $lt: +value2 },
        "ticker_dates.Market Capitalisation": { $gt: +value1, $lt: +value2 },
      })
      .limit(5);
    // .limit(5);
    // console.log("result", result);
    result.forEach(function(elem) {
      let compare = { dividend: {} };

      ticker_dates = elem._doc.ticker_dates;

      last_date = ticker_dates.slice(-1)[0];
      // console.log(last_date);

      var i = -1;
      //fetching dividends
      while (last_date["Dividends"] == undefined) {
        last_date = ticker_dates.slice(i)[0];

        i--;
        // console.log("lastdate", last_date);
      }
      var dividend = last_date["Dividends"];
      // console.log("dividend", dividend);

      compare.dividend["dividend"] = dividend.toString();
      // console.log("printing compare", compare);
      if (last_date["Market Capitalisation"] == undefined) {
        Market_cap = "-";
      } else {
        Market_cap = last_date["Market Capitalisation"];
      }
      compare.dividend["marketcap"] = Market_cap.toString();
      console.log(compare);
      search_result.push(compare);
    });
    console.log(search_result);
    if (result.length == 0) {
      res.status(400).json({
        status: 400,
        data: result,
        message: "No result",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Retrieved screener result successfully",
      });
    }
  } catch {
    console.log("from catch of screener");
  }
});
module.exports = router;
