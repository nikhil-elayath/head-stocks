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
    let result = await stocksData.aggregate([
      {
        $match: {
          $and: [{ sector: req.body.sector }, { industry: req.body.industry }],
        },
      },
      { $unwind: "$ticker_dates" },
      {
        $project: {
          ticker_dates: 1,
          ticker_id: 1,
          ticker_name: 1,
        },
      },
      // {
      //   $group: {
      //     // _id is used for string the year and month of the data of each quarter distinctly.
      //     _id: {
      //       // Year of the quarter is extracted and stored
      //       year: { $year: "$ticker_dates.date" },
      //       // Month of the quarter is extracted and stored
      //       month: { $month: "$ticker_dates.date" },
      //       day: { $dayOfMonth: "$ticker_dates.date" },
      //     },
      //     // all the data of quarters is stores in the key named date_values
      //     // $push is used to store the dates in this key
      //     date_values: { $push: "$ticker_dates" },
      //   },
      // },
      {
        $sort: {
          // _id key has the values stored of year and month
          //example:  _id{year:2009, month: 4}
          // "_id.year": -1,
          // "_id.month": -1,
          // "_id.day": -1,

          "ticker_dates.date": -1,
        },
      },
      { $arrayElemAt: ["$ticker_dates", 0] },
      {
        $match: {
          "ticker_dates.Market Capitalisation": {
            $gt: +market_cap_value1,
            $lt: +market_cap_value2,
          },
        },
      },
      // { $unwind: "$date_values" },
    ]);

    console.log("printing result", result);
    result.forEach(function(elem) {
      let compare = {};
      console.log("within for each");
      for (let i of result) {
        console.log("i", i.ticker_dates);
        console.log("iiis", i.ticker_dates["Market Capitalisation"]);
        // traversing in the dates within each quarter
        for (dates of i.ticker_dates) {
          // checks for a particular key to be present on a single date
          // Some Common Keys can be used here Eg:Total Assets, Net Profit,etc
          if (dates.hasOwnProperty("Market Capitalisation")) {
            // console.log(dates);
            // if 'Key' found then that date data is pushed into
            // the empty array(datesCF) declared on top
            console.log("market cap found"); // console.log(y)
          }
        }
      }

      ticker_dates = elem._doc.ticker_dates;
      console.log("ticker_dates", ticker_dates);

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
