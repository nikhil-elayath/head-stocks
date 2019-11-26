const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "stocks";
const stocksData = require("../../model/stocksModel");

router.post("/screener", async (req, res, next) => {
  console.log("body", req.body);

  const market_cap_value1 = req.body.market_cap_value1;

  const market_cap_value2 = req.body.market_cap_value2;
  const revenue1 = req.body.revenue1;
  const revenue2 = req.body.revenue2;
  const share_price1 = req.body.share_price1;
  const share_price2 = req.body.share_price2;
  const sector = req.body.sector;
  const industry = req.body.industry;
  const net_profit1 = req.body.net_profit1;
  const net_profit2 = req.body.net_profit2;
  const total_assests1 = req.body.total_assests1;
  const total_assests2 = req.body.total_assests2;
  const ebit1 = req.body.ebit1;
  console.log("ebit1", ebit1);
  const ebit2 = req.body.ebit2;
  console.log("ebit2", ebit2);
  const search_result = [];
  var startDate = "2008-12-29T00:00:00.000+00:00";
  var endDate = "2019-07-01T00:00:00.000+00:00";
  try {
    let result = await stocksData.find({
      "ticker_dates.date": {
        $gte: new Date("2008-12-29"),
        // $lte: new Date(endDate),
      },
      sector: sector,
      industry: industry,

      "ticker_dates.Share Price": {
        $lte: share_price2,
        $gte: share_price1,
      },
      "ticker_dates.Market Capitalisation": {
        $lte: market_cap_value2,
        $gte: market_cap_value1,
      },
      "ticker_dates.EV / EBITDA": {
        $lte: ebit2,
        $gte: ebit1,
      },
      "ticker_dates.Total Assets": {
        $lte: +total_assests2,
        $gte: +total_assests1,
      },
      "ticker_dates.Revenues": {
        $lte: +revenue2,
        $gte: +revenue1,
      },
      "ticker_dates.Net Profit": {
        $lte: +net_profit2,
        $gte: +net_profit1,
      },
    });
    console.log("result", result);
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
    // console.log("printing search result", result);
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
