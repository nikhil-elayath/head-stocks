const express = require("express");
const router = express.Router();
var result;
// used to provide path for downloadable file [piyush]
const path = require("path");

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "stocks";
const stocksData = require("../../model/stocksModel");

// Use connect method to connect to the server
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  var company_details = [];
  var data = {};
  try {
    let result = await stocksData.find({ ticker_id: +id });
    result.forEach(function(elem) {
      let compare = {};
      ticker_dates = elem._doc.ticker_dates;

      compare["ticker_name"] = elem._doc.ticker_name;
      compare["employees"] = elem._doc.employess;
      compare["profile"] = elem._doc.profile;
      compare["industry"] = elem._doc.industry;
      compare["sector"] = elem._doc.sector;
      compare["id"] = elem._doc.ticker_id;
      compare["image"] = elem._doc.ticker_logo;

      last_date = ticker_dates.slice(-1)[0];
      var i = -1;
      if (last_date["Market Capitalisation"] == undefined) {
        Market_cap = "-";
      } else {
        Market_cap = last_date["Market Capitalisation"];
      }
      compare["last_market_cap"] = Market_cap.toFixed(2);

      // fetching last share price
      if (last_date["Share Price"] == undefined) {
        share_price = "-";
      } else {
        share_price = last_date["Share Price"];
        share_date = last_date["date"];
      }
      compare["last_share_price"] = share_price;
      compare["share_date"] = share_date;

      // fetching the last date

      company_details.push(compare);
      console.log(company_details);
    });

    if (result.length == 0) {
      res.status(400).json({
        status: 400,
        data: company_details,
        message: "No companies found",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: company_details,
        message: "company by id recieved",
      });
    }
  } catch {}
});

// new financials
router.get("/financial/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let datesCF = [];
    let reports = { tickerValues: {} };
    // variable
    stocksData.aggregate(
      [
        { $unwind: "$ticker_dates" },
        {
          $match: {
            // ticker_name : "AAPL"
            ticker_id: +id,
            // ,
            // 'ticker_dates.date' : {
            //   $lte : new Date("2019-06-31"),
            //   $gte :  new Date("2018-03-25")
            // }
          },
        },
        {
          $project: {
            ticker_dates: 1,
            // ,"ticker_dates.Market Capitalisation": 1,

            quarter: {
              $cond: [
                {
                  $and: [
                    { $eq: [{ $month: "$ticker_dates.date" }, 3] },
                    { $lte: [{ $dayOfMonth: "$ticker_dates.date" }, 31] },
                    { $gt: [{ $dayOfMonth: "$ticker_dates.date" }, 25] },
                  ],
                },
                "first",
                {
                  $cond: [
                    {
                      $and: [
                        { $eq: [{ $month: "$ticker_dates.date" }, 6] },
                        { $lte: [{ $dayOfMonth: "$ticker_dates.date" }, 30] },
                        { $gt: [{ $dayOfMonth: "$ticker_dates.date" }, 25] },
                      ],
                    },
                    "second",
                    {
                      $cond: [
                        {
                          $and: [
                            { $eq: [{ $month: "$ticker_dates.date" }, 9] },
                            {
                              $lte: [{ $dayOfMonth: "$ticker_dates.date" }, 30],
                            },
                            {
                              $gt: [{ $dayOfMonth: "$ticker_dates.date" }, 25],
                            },
                          ],
                        },
                        "third",
                        {
                          $cond: [
                            {
                              $and: [
                                { $eq: [{ $month: "$ticker_dates.date" }, 12] },
                                {
                                  $lte: [
                                    { $dayOfMonth: "$ticker_dates.date" },
                                    31,
                                  ],
                                },
                                {
                                  $gt: [
                                    { $dayOfMonth: "$ticker_dates.date" },
                                    25,
                                  ],
                                },
                              ],
                            },
                            "fourth",
                            "fifth",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        { $match: { quarter: { $ne: "fifth" } } },

        {
          $group: {
            _id: {
              year: { $year: "$ticker_dates.date" },
              month: { $month: "$ticker_dates.date" },
            },
            date_values: { $push: "$ticker_dates" },
          },
        },
        {
          $sort: {
            "_id.year": -1,
            "_id.month": -1,
            // 'ticker_dates.date':-1,
          },
        },
      ],
      function(err, result) {
        // console.log("start");
        // console.log("end");
        if (result.length == 0) {
          if (err) console.log(err);
          return res.status(400).json({
            status: 400,
            data: result,
            message: "No Dates Found",
          });
        } else {
          if (err) throw err;
          for (let i of result) {
            for (dates of i.date_values) {
              if (dates.hasOwnProperty("Revenues")) {
                // console.log(dates);
                datesCF.push(dates);
                // console.log(y)
              }
            }
          }
          // console.log(datesCF);
          res.status(200).json({
            status: 200,
            data: datesCF,
            message: "Retrieved dates Successfully",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// ANALYSIS

router.post("/analysis", async (req, res, next) => {
  // console.log("analysis called");
  try {
    // console.log("re body", req.body.sector);
    const sector = req.body.sector;

    let result = await stocksData.find({ sector: { $in: sector } }).limit(4);
    const similar_sector_data = [];
    result.forEach(function(elem) {
      let compare = { tickerValues: {} };
      ticker_dates = elem._doc.ticker_dates;

      last_date = ticker_dates.slice(-1)[0];
      var i = -1;

      // getting ticker name
      let ticker_name = elem._doc.ticker_name;
      compare["ticker_name"] = ticker_name;

      // for dividends
      while (last_date["Dividends"] == undefined) {
        last_date = ticker_dates.slice(i)[0];
        i--;
      }
      dividend = last_date["Dividends"];
      compare.tickerValues["dividend"] = dividend.toString();

      // for market cap
      if (last_date["Market Capitalisation"] == undefined) {
        Market_cap = "-";
      } else {
        Market_cap = last_date["Market Capitalisation"];
      }
      compare.tickerValues["marketcap"] = Market_cap.toString();

      // for net profit
      while (last_date["Net Profit"] == undefined) {
        last_date = ticker_dates.slice(i)[0];
        i--;
      }
      // console.log(last_date["Net Profit"] / last_date["Dividends"]);
      if (last_date["Net Profit"] == undefined) {
        net_profit = "-";
      } else {
        net_profit = last_date["Net Profit"];
      }

      compare.tickerValues["net_profit"] = net_profit.toString();

      // for  calculating price to earning ratio

      // first calculating EPS

      while (
        last_date["Net Profit"] == undefined &&
        last_date["Dividends"] == undefined &&
        last_date[" Avg Basic Shares Outstanding"] == undefined &&
        last_date[" Share Price"] == undefined
      ) {
        last_date = ticker_dates.slice(i)[0];
        i--;
      }
      // PE
      ratio =
        (last_date["Share Price"] / last_date["Net Profit"] -
          last_date["Dividends"]) /
        last_date["Avg Basic Shares Outstanding"];
      compare.tickerValues["ratio"] = ratio.toFixed(3).toString();

      test =
        (last_date["Net Profit"] - last_date["Dividends"]) /
        last_date["Avg Basic Shares Outstanding"];
      console.log("test", test);

      // for current share price
      while (last_date["Share Price"] == undefined) {
        last_date = ticker_dates.slice(i)[0];
        i--;
      }
      current_share_price = last_date["Share Price"];
      compare.tickerValues[
        "current_share_price"
      ] = current_share_price.toString();
      // for Return on capital employed
      while (last_date["Share Price"] == undefined) {
        last_date = ticker_dates.slice(i)[0];
        i--;
      }
      roce =
        last_date["Net Profit"] /
        (last_date["Net Profit"] / last_date["Total Assets"] -
          last_date["Current Liabilities"]);

      compare.tickerValues["roce"] = roce.toFixed(3).toString();

      // pushing the object into the array
      similar_sector_data.push(compare);
    });

    if (result < 0) {
      res.status(400).json({
        status: 400,
        data: compare,
        message: "No news Found",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: [similar_sector_data],
        message: "Retrieved all news Successfully",
      });
    }
  } catch (err) {
    next(err);
  }
});

// for getting all the company name of the same sector in the dropdown for the comparison feature

router.post("/dropdown", async (req, res, next) => {
  const sector = req.body.sector;

  try {
    let result = await stocksData.find(
      { sector: { $in: sector } },

      { ticker_name: 1 },
      { sector: 1 }
    );
    if (result < 0) {
      res.status(400).json({
        status: 400,
        data: result,
        message: "No companies found",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Similar companies for dropdown retrieved",
      });
    }
  } catch {
    console.log("From catch of dropdown api");
  }
});

//download
// router.get("/download/:ticker_name", async (req, res, next) => {
//   const ticker_name = req.params.ticker_name;
//   res.download(
//     path.join(
//       __dirname,
//       "../../db-init/stock-data/yahoo-data/company/" + ticker_name + ".csv"
//     ),
//     function(err) {
//       console.log(err);
//     }
//   );
// });

module.exports = router;
