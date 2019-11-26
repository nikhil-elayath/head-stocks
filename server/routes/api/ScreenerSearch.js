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
  const share_price1 = req.body.share_price1;
  const share_price2 = req.body.share_price2;

  const search_result = [];
  try {
    let result = await stocksData.aggregate([
      {
        $match: {
          $and: [{ sector: "Technology" }, { industry: "Computer Hardware" }],
        },
      },

      { $unwind: "$ticker_dates" },

      {
        $match: {
          "ticker_dates.Market Capitalisation": {
            $gt: 10,
            $lt: 100,
          },
          // "ticker_dates.Share Price": {
          //   $gt: +share_price1,
          //   $lt: +share_price2,
          // },
          // "ticker_dates.Share Price": {
          //   $gt: +share_price1,
          //   $lt: +share_price2,
          // },
        },
      },
      {
        $project: {
          ticker_dates: 1,
          ticker_id: 1,
          ticker_name: 1,
          _id: 0,
        },
      },
      {
        $group: {
          _id: { ticker_name: "$ticker_name", ticker_id: "$ticker_id" },
          ticker_data: { $push: "$ticker_dates" },
        },
      },
      {
        $unwind: "$ticker_data",
      },
    ]);
    // result.forEach(function(elem) {
    //   let compare = {};
    //   console.log("within for each");
    //   for (let i of result) {
    //     // console.log("i", i.ticker_dates);
    //     console.log("iiis", i.ticker_dates["Market Capitalisation"]);
    //     // traversing in the dates within each quarter
    //     for (dates of i.ticker_dates) {
    //       // checks for a particular key to be present on a single date
    //       // Some Common Keys can be used here Eg:Total Assets, Net Profit,etc
    //       if (dates.hasOwnProperty("Market Capitalisation")) {
    //         // console.log(dates);
    //         // if 'Key' found then that date data is pushed into
    //         // the empty array(datesCF) declared on top
    //         console.log("market cap found"); // console.log(y)
    //       }
    //     }
    //   }

    //   ticker_dates = elem._doc.ticker_dates;
    //   console.log("ticker_dates", ticker_dates);

    //   last_date = ticker_dates.slice(-1)[0];
    //   // console.log(last_date);

    //   var i = -1;
    //   //fetching dividends
    //   while (last_date["Dividends"] == undefined) {
    //     last_date = ticker_dates.slice(i)[0];

    //     i--;
    //     // console.log("lastdate", last_date);
    //   }
    //   var dividend = last_date["Dividends"];
    //   // console.log("dividend", dividend);

    //   compare["dividend"] = dividend.toString();
    //   // console.log("printing compare", compare);
    //   if (last_date["Market Capitalisation"] == undefined) {
    //     Market_cap = "-";
    //   } else {
    //     Market_cap = last_date["Market Capitalisation"];
    //   }
    //   compare["marketcap"] = Market_cap.toString();

    //   search_result.push(compare);
    // });
    console.log("printing search result", search_result);
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
