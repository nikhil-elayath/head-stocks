const express = require("express");
const router = express.Router();
var result;

// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");

// Connection URL
// const url = "mongodb://localhost:27017";

// Database Name
// const dbName = "stocks";
const stocksData = require("../../model/stocksModel");

//Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);
//   router.get("/:id", async (req, res, next) => {
//     try {
//       let id = req.params.id;
//       console.log("printing id from api all", id);
//       var collection = db.collection("stocks_data");
//       // hardcoding dummy data
//       var dummy_date = [
//         "2009-09-30",
//         "2009-12-31",
//         "2010-03-31",
//         "2010-06-30",
//         "2010-09-30",
//         "2010-12-31",
//         "2011-03-31",
//         "2011-06-30",
//         "2011-09-30",
//         "2011-12-31",
//       ]; //variable
//       collection.findOne({ ticker_id: +id }, function(err, result) {
//         // console.log(result);
//         var balancesheet = [];
//         var cashflow = [];
//         var profitandloss = [];
//         var ratios = [];
//         var company_details = [];
//         // var company_id = [result.ticker_id];
//         //will contain company profile
//         // var company_profile = [result.profile];
//         // var company_sector = [result.sector];
//         // console.log("result", company_profile);

//         // console.log("printing only id from result", result);

//         // Fetching the object using dates for balance sheet
//         for (i of dummy_date) {
//           console.log("new i", i);
//           var balance = {};
//           var flow = {};
//           var ratio = {};
//           var pnl = {};
//           var details = {};
//           balance["ticker_dates"] = i;
//           flow["ticker_dates"] = i;
//           pnl["ticker_dates"] = i;
//           ratio["ticker_dates"] = i;
//           // balance["ticker_dates"] = i;
//           console.log("new bal", balance);
//           balance["Cash and Cash Equivalents"] = result.ticker_dates[i][
//             "Cash and Cash Equivalents"
//           ]
//             ? result.ticker_dates[i]["Cash and Cash Equivalents"]
//             : "-";
//           console.log("inside", balance);
//           balance["Current Assets"] = result.ticker_dates[i]["Current Assets"];
//           balance["Total Assets"] = result.ticker_dates[i]["Total Assets"];

//           balance["Accounts Payable"] =
//             result.ticker_dates[i]["Accounts Payable"];

//           balance["Receivables"] = result.ticker_dates[i]["Receivables"];

//           balance["Total Liabilities"] =
//             result.ticker_dates[i]["Total Liabilities"];

//           balance["Current Liabilities"] =
//             result.ticker_dates[i]["Current Liabilities"];

//           balance["Preferred Equity"] =
//             result.ticker_dates[i]["Preferred Equity"];

//           balance["Equity Before Minorities"] =
//             result.ticker_dates[i]["Equity Before Minorities"];

//           balance["Minorities Interest"] = result.ticker_dates[i]["Minorities"];

//           balance["Noncurrent Liabilities"] =
//             result.ticker_dates[i]["Total Noncurrent Liabilities"];
//           balancesheet.push(balance);

//           //cashflow
//           flow["Cash From Operating Activities"] =
//             result.ticker_dates[i]["Cash From Operating Activities"];

//           flow["Cash From Investing Activities"] =
//             result.ticker_dates[i]["Cash From Investing Activities"];

//           flow["Cash From Financing Activities"] =
//             result.ticker_dates[i]["Cash From Financing Activities"];

//           flow["EBITDA"] = result.ticker_dates[i]["EBITDA"];

//           flow["Net Change in Cash"] =
//             result.ticker_dates[i]["Net Change in Cash"];

//           flow["Net PP&E"] = result.ticker_dates[i]["Net PP&E"];

//           flow["Dividends"] = result.ticker_dates[i]["Dividends"];
//           cashflow.push(flow);

//           //PROFIT AND LOSS
//           pnl["Revenues"] = result.ticker_dates[i]["Revenues"];
//           pnl["EBIT"] = result.ticker_dates[i]["EBIT"];

//           pnl["Net Profit"] = result.ticker_dates[i]["Net Profit"];

//           pnl["Revenues"] = result.ticker_dates[i]["Revenues"];
//           profitandloss.push(pnl);

//           //calculating ratios
//           ratio["Current Ratio"] =
//             result.ticker_dates[i]["Current Assets"] /
//             result.ticker_dates[i]["Current Liabilities"];

//           ratio["Liabilities To Equity"] =
//             result.ticker_dates[i]["Total Liabilities"] /
//             result.ticker_dates[i]["Total Equity"];

//           ratio["Debt To Asset"] =
//             result.ticker_dates[i]["Total Assets"] /
//             result.ticker_dates[i]["Total Liabilities"];
//           ratios.push(ratio);
//         }
//         // var company_details = [];
//         // details["ticker_id"] = result.ticker_id;
//         // details["sector"] = result.sector;
//         // details["industry"] = result.industry;

//         // details["ticker_name"] = result.ticker_name;
//         // details["employess"] = result.employess;

//         // details["profile"] = result.profile;

//         // details["company_name"] = result.company_name;
//         // company_details.push(details);

//         // console.log("Balance sheet", balancesheet);
//         // console.log("cashflow sheet", cashflow);
//         // console.log("pnl", profitandloss);

//         // console.log("ratios", ratios);
//         console.log(company_details);

//         if (!result) {
//           return res.status(400).send({ message: "No data found" });
//         } else {
//           if (err) throw err;
//           res.status(200).json({
//             status: 200,
//             data: {
//               balancesheet: balancesheet,
//               cashflow: cashflow,
//               profitandloss: profitandloss,
//               ratios: ratios,
//               ticker_id: result.ticker_id,
//               profile: result.profile,
//               industry: result.industry,
//               company_name: result.company_name,
//               employess: result.employess,
//               ticker_name: result.ticker_name,
//               sector: result.sector,
//             },

//             message: "Retrieved data from company detail successfully",
//           });
//         }
//       });
//     } catch (err) {
//       next(err);
//     }
//   });
// });

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
router.get("/analysis/:sector", async (req, res, next) => {
  console.log("analysis called");
  try {
    let sector = req.params.sector;
    console.log("sector is", sector);
    let result = await stocksData
      .find({ sector: sector }, { ticker_name: 1, _id: 0 })
      .limit(5);

    console.log("sector filter", result);
    if (result < 0) {
      res.status(400).json({
        status: 400,
        data: result,
        message: "No news Found"
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Retrieved all news Successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});

//new financials
router.get("/finanicals/:id", async (req, res, next) => {
  console.log("financials called");
  try {
    let id = req.params.id;
    console.log("id is", id);
    // let result = await stocksData.find(
    //   { ticker_id: +id }
    let quarter = await stocksData.aggregate([
      {
        $project: {
          // dateAttempted: 1,
          // userId: 1,
          // topicId: 1,
          // ekgId: 1,
          // title: 1,
          ticker_id: 1,
          "ticker_dates:date": 1,
          quarter: {
            $cond: [
              { $lte: [{ $month: "$ticker_dates:date" }, 3] },
              "first",
              {
                $cond: [
                  { $lte: [{ $month: "$ticker_dates:date" }, 6] },
                  "second",
                  {
                    $cond: [
                      { $lte: [{ $month: "$ticker_dates:date" }, 9] },
                      "third",
                      "fourth"
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      {
        $group: { _id: { quarter: "$quarter" }, results: { $push: "$$ROOT" } }
      }
    ]);
    // { ticker_dates: 1 },
    // { ticker_id: { $lt: 3 } }

    console.log("first result", quarter[0]);
    // {ticker_name:1,_id:0,"ticker_dates":{'$elemMatch': {date: new Date("2009-03-31T00:00:00.000+00:00")}}}
    // console.log("asdsad", result[0]["ticker_dates"]);
    const cashflow = [];
    // for (i of result[0]["ticker_dates"]) {
    //   if (i.hasOwnProperty("Cash & Cash Equivalents")) {
    //     cashflow.push(i["Cash & Cash Equivalents"]);
    //   } else {
    //     console.log("not found");
    //   }
    // }
    // console.log("ME AAYA LOOP k bahar", cashflow);

    // console.log(
    //   "printing result"
    //   // result[0]["ticker_dates"][0].hasOwnProperty("Share Price")
    // );
    var dates_obj = {};
    // result[0]["ticker_dates"][0].hasOwnProperty("Share Price")
    //   ? console.log(result[0]["ticker_dates"][0])
    //   : console.log("nai");

    // if (result < 0) {
    //   res.status(400).json({
    //     status: 400,
    //     data: result,
    //     message: "No news Found",
    //   });
    // } else {
    //   res.status(200).json({
    //     status: 200,
    //     data: result,
    //     message: "Retrieved all financials Successfully",
    //   });
    // }
  } catch (err) {
    next(err);
  }
});

//closing the connect method

module.exports = router;
