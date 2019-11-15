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

//Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  router.get("/:id", async (req, res, next) => {
    try {
      let id = req.params.id;
      console.log("printing id from api all", id);
      var collection = db.collection("stocks_data");
      // hardcoding dummy data
      var dummy_date = [
        "2009-09-30",
        "2009-12-31",
        "2010-03-31",
        "2010-06-30",
        "2010-09-30",
        "2010-12-31",
        "2011-03-31",
        "2011-06-30",
        "2011-09-30",
        "2011-12-31"
      ]; //variable
      collection.findOne({ ticker_id: +id }, function(err, result) {
        // console.log(result);
        var balancesheet = [];
        var cashflow = [];
        var profitandloss = [];
        var ratios = [];
        var company_details = [];
        // var company_id = [result.ticker_id];
        //will contain company profile
        // var company_profile = [result.profile];
        // var company_sector = [result.sector];
        // console.log("result", company_profile);

        // console.log("printing only id from result", result);

        // Fetching the object using dates for balance sheet
        for (i of dummy_date) {
          console.log("new i", i);
          var balance = {};
          var flow = {};
          var ratio = {};
          var pnl = {};
          var details = {};
          balance["ticker_dates"] = i;
          flow["ticker_dates"] = i;
          pnl["ticker_dates"] = i;
          ratio["ticker_dates"] = i;
          // balance["ticker_dates"] = i;
          console.log("new bal", balance);
          balance["Cash and Cash Equivalents"] = result.ticker_dates[i][
            "Cash and Cash Equivalents"
          ]
            ? result.ticker_dates[i]["Cash and Cash Equivalents"]
            : "-";
          console.log("inside", balance);
          balance["Current Assets"] = result.ticker_dates[i]["Current Assets"];
          balance["Total Assets"] = result.ticker_dates[i]["Total Assets"];

          balance["Accounts Payable"] =
            result.ticker_dates[i]["Accounts Payable"];

          balance["Receivables"] = result.ticker_dates[i]["Receivables"];

          balance["Total Liabilities"] =
            result.ticker_dates[i]["Total Liabilities"];

          balance["Current Liabilities"] =
            result.ticker_dates[i]["Current Liabilities"];

          balance["Preferred Equity"] =
            result.ticker_dates[i]["Preferred Equity"];

          balance["Equity Before Minorities"] =
            result.ticker_dates[i]["Equity Before Minorities"];

          balance["Minorities Interest"] = result.ticker_dates[i]["Minorities"];

          balance["Noncurrent Liabilities"] =
            result.ticker_dates[i]["Total Noncurrent Liabilities"];
          balancesheet.push(balance);

          //cashflow
          flow["Cash From Operating Activities"] =
            result.ticker_dates[i]["Cash From Operating Activities"];

          flow["Cash From Investing Activities"] =
            result.ticker_dates[i]["Cash From Investing Activities"];

          flow["Cash From Financing Activities"] =
            result.ticker_dates[i]["Cash From Financing Activities"];

          flow["EBITDA"] = result.ticker_dates[i]["EBITDA"];

          flow["Net Change in Cash"] =
            result.ticker_dates[i]["Net Change in Cash"];

          flow["Net PP&E"] = result.ticker_dates[i]["Net PP&E"];

          flow["Dividends"] = result.ticker_dates[i]["Dividends"];
          cashflow.push(flow);

          //PROFIT AND LOSS
          pnl["Revenues"] = result.ticker_dates[i]["Revenues"];
          pnl["EBIT"] = result.ticker_dates[i]["EBIT"];

          pnl["Net Profit"] = result.ticker_dates[i]["Net Profit"];

          pnl["Revenues"] = result.ticker_dates[i]["Revenues"];
          profitandloss.push(pnl);

          //calculating ratios
          ratio["Current Ratio"] =
            result.ticker_dates[i]["Current Assets"] /
            result.ticker_dates[i]["Current Liabilities"];

          ratio["Liabilities To Equity"] =
            result.ticker_dates[i]["Total Liabilities"] /
            result.ticker_dates[i]["Total Equity"];

          ratio["Debt To Asset"] =
            result.ticker_dates[i]["Total Assets"] /
            result.ticker_dates[i]["Total Liabilities"];
          ratios.push(ratio);
        }
        // var company_details = [];
        // details["ticker_id"] = result.ticker_id;
        // details["sector"] = result.sector;
        // details["industry"] = result.industry;

        // details["ticker_name"] = result.ticker_name;
        // details["employess"] = result.employess;

        // details["profile"] = result.profile;

        // details["company_name"] = result.company_name;
        // company_details.push(details);

        // console.log("Balance sheet", balancesheet);
        // console.log("cashflow sheet", cashflow);
        // console.log("pnl", profitandloss);

        // console.log("ratios", ratios);
        console.log(company_details);

        if (!result) {
          return res.status(400).send({ message: "No data found" });
        } else {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            data: {
              balancesheet: balancesheet,
              cashflow: cashflow,
              profitandloss: profitandloss,
              ratios: ratios,
              ticker_id: result.ticker_id,
              profile: result.profile,
              industry: result.industry,
              company_name: result.company_name,
              employess: result.employess,
              ticker_name: result.ticker_name,
              sector: result.sector
            },

            message: "Retrieved data Successfully"
          });
        }
      });
    } catch (err) {
      next(err);
    }
  });

  //getting cash flow

  // router.get("/financial/:id", async (req, res, next) => {
  //   try {
  //     let id = req.params.id;
  //     console.log("printing id from api all", id);
  //     var collection = db.collection("stocks");
  //     collection.findOne({ _id: +id }, function(err, result) {
  //       print(result);
  //       if (!result) {
  //         return res.status(400).send({ message: "No data found" });
  //       } else {
  //         if (err) throw err;
  //         res.status(200).json({
  //           status: 200,
  //           data: result,
  //           message: "Retrieved news Successfully",
  //         });
  //       }
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // });

  //for analysis
  router.get("/analysis/:id", async (req, res, next) => {
    try {
      let id = req.params.id;
      console.log("printing id from api all", id);
      var collection = db.collection("stocks");
      collection.findOne({ _id: +id }, function(err, result) {
        if (!result) {
          return res.status(400).send({ message: "No data found" });
        } else {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            data: result,
            message: "Retrieved news Successfully"
          });
        }
      });
    } catch (err) {
      next(err);
    }
  });

  //closing the connect method
});

//downloading company data[piyush]
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
    alert("Invalid data");
    return;
  }

  return CSV;
}
const pg = require("pg-promise")();
const db = pg("postgres://postgres:root@localhost:5432/headstocks");
//get indicatornames and values for a specific ticker
router.get("/download/:ticker_name", async (req, res, next) => {
  try {
    let ticker_name = req.params.ticker_name;
    const result = await db.any(
      `select dates,indicatorname,indicatorvalue from simfin where ticker='${ticker_name}' `
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

//provides downloadable format according to the required tickername for ohlc [piyush]
// router.get("/downloadohlc/:ticker_name", async (req, res, next) => {
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

router.get("/downloadohlc/:ticker_name", async (req, res, next) => {
  try {
    let ticker_name = req.params.ticker_name;
    const result = await db.any(
      `select dates, opening ,high ,low ,closing ,adjclose ,volume  from yahoodata where ticker = '${ticker_name}'; `
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
