const express = require("express");
const router = express.Router();
var result;

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "headstocks";

//Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  router.get("/:id", async (req, res, next) => {
    try {
      let id = req.params.id;
      console.log("printing id from api all", id);
      var collection = db.collection("stocks");
      // hardcoding dummy data
      dummy_date = ["2010-03-31", "2010-06-30", "2010-09-30"]; //variable
      collection.findOne({ _id: +id }, function(err, result) {
        var balancesheet = [];
        var cashflow = [];
        var profitandloss = [];
        var ratios = [];

        console.log("printing only id from result", result._id);

        // Fetching the object using dates for balance sheet
        for (i of dummy_date) {
          var balance = {};
          var flow = {};
          var ratio = {};
          var pnl = {};
          balance["date"] = i;
          balance["Cash and Cash Equivalents"] = result.tdate[i][
            "Cash and Cash Equivalents"
          ]
            ? result.tdate[i]["Cash and Cash Equivalents"]
            : "-";
          balance["Current Assets"] = result.tdate[i]["Current Assets"];
          balance["Total Assets"] = result.tdate[i]["Total Assets"];

          balance["Accounts Payable"] = result.tdate[i]["Accounts Payable"];

          balance["Receivables"] = result.tdate[i]["Receivables"];

          balance["Total Liabilities"] = result.tdate[i]["Total Liabilities"];

          balance["Current Liabilities"] =
            result.tdate[i]["Current Liabilities"];

          balance["Preferred Equity"] = result.tdate[i]["Preferred Equity"];

          balance["Equity Before Minorities"] =
            result.tdate[i]["Equity Before Minorities"];

          balance["Minorities Interest"] = result.tdate[i]["Minorities"];

          balance["Noncurrent Liabilities"] =
            result.tdate[i]["Total Noncurrent Liabilities"];
          balancesheet.push(balance);

          //cashflow
          flow["Cash From Operating Activities"] =
            result.tdate[i]["Cash From Operating Activities"];

          flow["Cash From Investing Activities"] =
            result.tdate[i]["Cash From Investing Activities"];

          flow["Cash From Financing Activities"] =
            result.tdate[i]["Cash From Financing Activities"];

          flow["EBITDA"] = result.tdate[i]["EBITDA"];

          flow["Net Change in Cash"] = result.tdate[i]["Net Change in Cash"];

          flow["Net PP&E"] = result.tdate[i]["Net PP&E"];

          flow["Dividends"] = result.tdate[i]["Dividends"];
          cashflow.push(flow);

          //PROFIT AND LOSS
          pnl["Revenues"] = result.tdate[i]["Revenues"];
          pnl["EBIT"] = result.tdate[i]["EBIT"];

          pnl["Net Profit"] = result.tdate[i]["Net Profit"];

          pnl["Revenues"] = result.tdate[i]["Revenues"];
          profitandloss.push(pnl);

          //calculating ratios
          ratio["Current Ratio"] =
            result.tdate[i]["Current Assets"] /
            result.tdate[i]["Current Liabilities"];

          ratio["Liabilities To Equity"] =
            result.tdate[i]["Total Liabilities"] /
            result.tdate[i]["Total Equity"];

          ratio["Debt To Asset"] =
            result.tdate[i]["Total Assets"] /
            result.tdate[i]["Total Liabilities"];
          ratios.push(ratio);
        }
        console.log("Balance sheet", balancesheet);
        console.log("cashflow sheet", cashflow);
        console.log("pnl", profitandloss);

        console.log(ratio);

        if (!result) {
          return res.status(400).send({ message: "No data found" });
        } else {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            data: [result._id, balancesheet, cashflow, profitandloss],
            message: "Retrieved news Successfully",
          });
        }
      });
    } catch (err) {
      next(err);
    }
  });

  //getting cash flow

  router.get("/financial/:id", async (req, res, next) => {
    try {
      let id = req.params.id;
      console.log("printing id from api all", id);
      var collection = db.collection("stocks");
      collection.findOne({ _id: +id }, function(err, result) {
        print(result);
        if (!result) {
          return res.status(400).send({ message: "No data found" });
        } else {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            data: result,
            message: "Retrieved news Successfully",
          });
        }
      });
    } catch (err) {
      next(err);
    }
  });

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
            message: "Retrieved news Successfully",
          });
        }
      });
    } catch (err) {
      next(err);
    }
  });

  //closing the connect method
});

module.exports = router;
