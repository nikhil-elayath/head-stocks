const express = require("express");
const router = express.Router();
var result;
//used to provide path for downloadable file [piyush]
const path = require("path");

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "stocks";
const stocksData = require("../../model/stocksModel");

//Use connect method to connect to the server
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log("get by id api called", id);
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

      last_date = ticker_dates.slice(-1)[0];
      console.log("lastdate", last_date);
      var i = -1;
      if (last_date["Market Capitalisation"] == undefined) {
        Market_cap = "-";
      } else {
        Market_cap = last_date["Market Capitalisation"];
      }

      console.log("market_cap", Market_cap);
      compare["last_market_cap"] = Market_cap;

      company_details.push(compare);
    });
    console.log(company_details);

    if (result < 0) {
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
  } catch {
    console.log("From catch of getbyid api");
  }
});

//for analysis

//new financials
router.get("/financial/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    //variable
    // stocksData.findOne({ticker_name: 'AAPL',"ticker_dates":{'$elemMatch': {date: new Date("2019-03-31")}}}, function(err, result) {
    stocksData.aggregate(
      [
        { $unwind: "$ticker_dates" },
        {
          $match: {
            ticker_id: +id,
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
        { $sort: { "ticker_dates.date": -1 } },
        {
          $group: {
            _id: { quarter: "$quarter" },
            results: { $push: "$ticker_dates" },
          },
        },
      ],
      function(err, result) {
        if (!result) {
          return res.status(400).json({
            status: 400,
            data: result,
            message: "Retrieved dates Successfully",
          });
        } else {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            data: result,
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

//closing the connect method

//ANALYSIS

router.post("/analysis", async (req, res, next) => {
  console.log("analysis called");
  try {
    console.log("re body", req.body.sector);
    const sector = req.body.sector;

    let result = await stocksData.find({ sector: { $in: sector } }).limit(4);
    const similar_sector_data = [];
    result.forEach(function(elem) {
      let compare = { tickerValues: {} };
      ticker_dates = elem._doc.ticker_dates;

      last_date = ticker_dates.slice(-1)[0];
      var i = -1;

      //getting ticker name
      let ticker_name = elem._doc.ticker_name;
      compare["ticker_name"] = ticker_name;

      //for dividends
      while (last_date["Dividends"] == undefined) {
        last_date = ticker_dates.slice(i)[0];
        i--;
      }
      dividend = last_date["Dividends"];
      compare.tickerValues["dividend"] = dividend.toString();

      //for market cap
      if (last_date["Market Capitalisation"] == undefined) {
        Market_cap = "-";
      } else {
        Market_cap = last_date["Market Capitalisation"];
      }
      console.log("net profit", last_date["Market Capitalisation"]);
      // Market_cap = last_date["Market Capitalisation"];
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
      console.log("net profit", last_date["Net Profit"]);

      compare.tickerValues["net_profit"] = net_profit.toString();

      //for  calculating price to earning ratio

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
      //PE
      ratio =
        (last_date["Share Price"] / last_date["Net Profit"] -
          last_date["Dividends"]) /
        last_date["Avg Basic Shares Outstanding"];
      compare.tickerValues["ratio"] = ratio.toFixed(3).toString();

      //for current share price
      while (last_date["Share Price"] == undefined) {
        last_date = ticker_dates.slice(i)[0];
        i--;
      }
      current_share_price = last_date["Share Price"];
      compare.tickerValues[
        "current_share_price"
      ] = current_share_price.toString();
      //for Return on capital employed
      while (last_date["Share Price"] == undefined) {
        last_date = ticker_dates.slice(i)[0];
        i--;
      }
      roce =
        last_date["Net Profit"] /
        (last_date["Net Profit"] / last_date["Total Assets"] -
          last_date["Current Liabilities"]);

      compare.tickerValues["roce"] = roce.toFixed(3).toString();

      //pushing the object into the array
      similar_sector_data.push(compare);
    });
    console.log("similar_sector_data", similar_sector_data);

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

//for getting all the company name of the same sector in the dropdown for the comparison feature

router.post("/dropdown", async (req, res, next) => {
  console.log("drop down api called");
  const sector = req.body.sector;
  console.log("sector from drop down api", sector);

  try {
    let result = await stocksData.find(
      { sector: { $in: sector } },

      { ticker_name: 1 },
      { sector: 1 }
    );
    console.log("result for dropdown", result);
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

module.exports = router;
