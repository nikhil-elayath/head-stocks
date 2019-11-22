const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "stocks";
const stocksData = require("../../model/stocksModel");

router.post("/screener", async (req, res, next) => {
  console.log("body", req.body);
  const dividend_value1 = req.body.dividend_value1;
  const dividend_value2 = req.body.dividend_value2;
  const market_cap_value1 = req.body.market_cap_value1;

  const market_cap_value2 = req.body.market_cap_value2;
  const price_to_equity_ratio1 = req.body.price_to_equity_ratio1;
  const price_to_equity_ratio2 = req.body.price_to_equity_ratio2;

  const search_result = [];
  try {
    let result = await stocksData

      .find({
        $and: [
          { sector: req.body.sector },
          { industry: req.body.industry },
          // {
          //   "ticker_dates.Dividends": {
          //     $gt: 60,
          //   },
          //   // ticker_id: 1,
          // },
          {
            "ticker_dates.Market Capitalisation": {
              $gt: +market_cap_value1,
              $lt: +market_cap_value2,
            },
          },
        ],
      })
      .limit(5);
    result.forEach(function(elem) {
      let compare = {};

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

      compare["dividend"] = dividend.toString();
      // console.log("printing compare", compare);
      if (last_date["Market Capitalisation"] == undefined) {
        Market_cap = "-";
      } else {
        Market_cap = last_date["Market Capitalisation"];
      }
      compare["marketcap"] = Market_cap.toString();

      search_result.push(compare);
    });
    console.log("printing search result", search_result);
    if (result.length == 0) {
      res.status(400).json({
        status: 400,
        data: search_result,
        message: "No result",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: search_result,
        message: "Retrieved screener result successfully",
      });
    }
  } catch {
    console.log("from catch of screener");
  }
});
module.exports = router;
