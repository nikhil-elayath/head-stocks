const express = require("express");
const router = express.Router();
var result;

// used to provide path for downloadable file [piyush]
const path = require("path");
const pg = require("pg-promise")();
const db = pg("postgres://postgres:root@localhost:5432/headstocks");

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
    });

    if (result.length == 0) {
      res.status(400).json({
        status: 400,
        data: company_details,
        message: "No companies found"
      });
    } else {
      res.status(200).json({
        status: 200,
        data: company_details,
        message: "company by id recieved"
      });
    }
  } catch {}
});

// new financials - Harshal Patil
// Gets data of a particular company according to  the dates of their reports data in an descending order
router.get("/financial/:id", async (req, res, next) => {
  try {
    // stores the Id of the Company that is recieved from params
    let id = req.params.id;
    // an empty array datesCF that will help to filter the results recieved from the database
    let datesCF = [];
    //
    // let reports = { tickerValues: {} };
    // variable

    // Aggregate function to find and store the data
    // according to dates in an descending order
    // (Most recent data is displayed First)
    stocksData.aggregate(
      [
        // Deconstucts the array field
        // replaces the array field with the respective element
        { $unwind: "$ticker_dates" },
        {
          // finds the data for a particular company based on its ticker_id in database
          $match: {
            ticker_id: +id

            // finds the data for a particular company based on its ticker_name in database
            // ticker_name : "AAPL"
            // ,

            // sets a range of dates for what the data is needed
            // 'ticker_dates.date' : {
            //   $lte : new Date("2019-06-31"),
            //   $gte :  new Date("2018-03-25")
            // }
          }
        },
        {
          //$project limits the amount of data sent to the application
          $project: {
            // only the ticker_dates data is used
            ticker_dates: 1,
            // Differentiating the data in different quarter of a year based on date
            quarter: {
              //Multiple conditional statements to check which quarter the data must be added
              // 1st conditional Statement($cond) to check if the data is of first quarter
              $cond: [
                {
                  // $and to check all condition are satisfied
                  $and: [
                    //  $month extrates the month(mm) of the date(dd/mm/yyyy) value in data
                    //  checks if the month value in date is 3
                    { $eq: [{ $month: "$ticker_dates.date" }, 3] },
                    // $dayOfmonth extrats the day(dd) of the date(dd/mm/yyyy) value from the data
                    // $lte(less than or equal to) Query Selector
                    // to set the maximum date
                    // which is 31st (OR 30th in some cases)
                    { $lte: [{ $dayOfMonth: "$ticker_dates.date" }, 31] },
                    // $gt(greater than) Query Selector
                    // to set the minimum date which is 25th
                    { $gt: [{ $dayOfMonth: "$ticker_dates.date" }, 25] }
                  ]
                },
                // sets the quarter name as first
                // the quarter is an object
                // that will contain all the dates
                // data objects inside an array
                "first",
                {
                  // 2nd conditional Statement($cond) to check if the data is of second quarter
                  $cond: [
                    {
                      $and: [
                        { $eq: [{ $month: "$ticker_dates.date" }, 6] },
                        { $lte: [{ $dayOfMonth: "$ticker_dates.date" }, 30] },
                        { $gt: [{ $dayOfMonth: "$ticker_dates.date" }, 25] }
                      ]
                    },
                    "second",
                    {
                      // 3rd conditional Statement($cond) to check if the data is of third quarter
                      $cond: [
                        {
                          $and: [
                            { $eq: [{ $month: "$ticker_dates.date" }, 9] },
                            {
                              $lte: [{ $dayOfMonth: "$ticker_dates.date" }, 30]
                            },
                            {
                              $gt: [{ $dayOfMonth: "$ticker_dates.date" }, 25]
                            }
                          ]
                        },
                        "third",
                        {
                          // $th conditional Statement($cond) to check if the data is of forth quarter
                          $cond: [
                            {
                              $and: [
                                { $eq: [{ $month: "$ticker_dates.date" }, 12] },
                                {
                                  $lte: [
                                    { $dayOfMonth: "$ticker_dates.date" },
                                    31
                                  ]
                                },
                                {
                                  $gt: [
                                    { $dayOfMonth: "$ticker_dates.date" },
                                    25
                                  ]
                                }
                              ]
                            },
                            "fourth",
                            // If date does not belong t the specified quarters
                            // add those dates to the 'fifth' quarter
                            // which will be removed in the further part of query
                            // all dates in fifth quarter are not needed.
                            "fifth"
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        },
        // ALl the dates belonging to the fifth quarter are removed.
        // $ne (not equal) helps to get data from all quarters except the 'fifth' quarter
        { $match: { quarter: { $ne: "fifth" } } },

        {
          // Grouping the results from the required quarters.
          // $group combines and creates the object as we need
          // as the result of the query
          $group: {
            // _id is used for string the year and month of the data of each quarter distinctly.
            _id: {
              // Year of the quarter is extracted and stored
              year: { $year: "$ticker_dates.date" },
              // Month of the quarter is extracted and stored
              month: { $month: "$ticker_dates.date" }
            },
            // all the data of quarters is stores in the key named date_values
            // $push is used to store the dates in this key
            date_values: { $push: "$ticker_dates" }
          }
        },
        {
          // Sorting the data in descending order
          // $sort helps to sort the data on the basis of
          // year and month
          $sort: {
            // _id key has the values stored of year and month
            //example:  _id{year:2009, month: 4}
            "_id.year": -1,
            "_id.month": -1
            // 'ticker_dates.date':-1,
          }
        }
      ],
      // function to sort the result in the desired form
      // send the response Or result to the front-end
      function(err, result) {
        //checks if result is recieved from query
        if (result.length == 0) {
          // checks for error
          if (err) console.log(err);
          // response of API when no result is found.
          return res.status(400).json({
            status: 400,
            data: result,
            message: "No Dates Found"
          });
        } else {
          // block executes when results is recieved from the query
          if (err) throw err;
          // converting the result of query in the desired form
          // traversing in each value of the result
          for (let i of result) {
            // traversing in the dates within each quarter
            for (dates of i.date_values) {
              // checks for a particular key to be present on a single date
              // Some Common Keys can be used here Eg:Total Assets, Net Profit,etc
              if (dates.hasOwnProperty("Revenues")) {
                // console.log(dates);
                // if 'Key' found then that date data is pushed into
                // the empty array(datesCF) declared on top
                datesCF.push(dates);
                // console.log(y)
              }
            }
          }
          // console.log(datesCF);

          // On Successful Execution Of the API
          // response of API when Result is found.
          res.status(200).json({
            status: 200,
            data: datesCF,
            message: "Retrieved dates Successfully"
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    // next(err);
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
        message: "No news Found"
      });
    } else {
      res.status(200).json({
        status: 200,
        data: [similar_sector_data],
        message: "Retrieved all news Successfully"
      });
    }
  } catch (err) {
    // next(err);
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
        message: "No companies found"
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Similar companies for dropdown retrieved"
      });
    }
  } catch {}
});

//apis for downloading data [piyush]

//Converts JSON data To CSV
function JSONToCSVConvertor(JSONData, ShowLabel) {
  //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
  var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
  var CSV = "";
  //This condition will generate the Label/Header
  if (ShowLabel) {
    var row = "";

    //This loop will extract the label from 1st index of on array
    for (var index in arrData[0]) {
      //Now convert each value to string and comma-seprated
      row += index + ",";
    }
    row = row.slice(0, -1);
    //append Label row with line break
    CSV += row + "\r\n";
  }

  //1st loop is to extract each row
  for (var i = 0; i < arrData.length; i++) {
    var row = "";
    //2nd loop will extract each column and convert it in string comma-seprated
    for (var index in arrData[i]) {
      row += arrData[i][index] + ",";
    }
    row.slice(0, row.length - 1);
    //add a line break after each row
    CSV += row + "\r\n";
  }

  if (CSV == "") {
    return "Invalid data";
  }

  return CSV;
}

//get indicatornames and values for a specific ticker
router.get("/indicatorsdata/:ticker_name", async (req, res, next) => {
  try {
    let ticker_name = req.params.ticker_name;
    const result = await db.any(
      `select * from simfin where ticker='${ticker_name}'  limit 50`
    );
    if (!result)
      return res.status(404).json({
        message: "No record found"
      });
    else {
      var jsonObject = JSON.stringify(result);
      // Convert JSON to CSV
      let csvdata = JSONToCSVConvertor(jsonObject, true);

      res.send(csvdata);
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
});
router.get("/ohlc/:ticker_name", async (req, res, next) => {
  try {
    let ticker_name = req.params.ticker_name;
    const result = await db.any(
      `select ticker,dates,opening,high,low,closing,adjclose,volume from yahoodata where ticker='${ticker_name}'`
    );
    if (!result)
      return res.status(404).json({
        message: "No record found"
      });
    else {
      var jsonObject = JSON.stringify(result);
      // Convert JSON to CSV
      let csvdata = JSONToCSVConvertor(jsonObject, true);
      res.send(csvdata);
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
});

module.exports = router;
