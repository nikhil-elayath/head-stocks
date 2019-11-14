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

// //Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

  // const db = client.db(dbName);
  router.get("/financial/:id", async (req, res, next) => {
    try {
      let id = req.params.id;
     //variable
      // stocksData.findOne({ticker_name: 'AAPL',"ticker_dates":{'$elemMatch': {date: new Date("2019-03-31")}}}, function(err, result) {
      stocksData.aggregate(
        [
          {$unwind : "$ticker_dates"},
          {$match : {
            // ticker_name : "AAPL"
            ticker_id : +id
            // ,
            // 'ticker_dates.date' : {
            //   $lte : new Date("2019-06-31"),
            //   $gte :  new Date("2018-03-25") 
            // }
          }},
          {$project : {"ticker_dates" : 1,
          // ,"ticker_dates.Market Capitalisation": 1,
    
            "quarter":{$cond:[{
              $and : 
              [{$eq:[{$month: 
                "$ticker_dates.date"
                         },3]},
                         {$lte:[{$dayOfMonth: 
                           "$ticker_dates.date"
                                    },31]},
                                   { $gt:[{$dayOfMonth: 
                                     "$ticker_dates.date"
                                              },25]}]},
                                 "first",
                                 {$cond:[{$and : 
                                  [{$eq:[{$month: 
                                    "$ticker_dates.date"
                                             },6]},
                                             {$lte:[{$dayOfMonth: 
                                               "$ticker_dates.date"
                                                        },30]},
                                                       { $gt:[{$dayOfMonth: 
                                                         "$ticker_dates.date"
                                                                  },25]}]},
                                         "second",
                                         {$cond:[{$and : 
                                          [{$eq:[{$month: 
                                            "$ticker_dates.date"
                                                     },9]},
                                                     {$lte:[{$dayOfMonth: 
                                                       "$ticker_dates.date"
                                                                },30]},
                                                               { $gt:[{$dayOfMonth: 
                                                                 "$ticker_dates.date"
                                                                          },25]}]},
                                                 "third",
                                                 {$cond:[{$and : 
                                                  [{$eq:[{$month: 
                                                    "$ticker_dates.date"
                                                             },12]},
                                                             {$lte:[{$dayOfMonth: 
                                                               "$ticker_dates.date"
                                                                        },31]},
                                                                       { $gt:[{$dayOfMonth: 
                                                                         "$ticker_dates.date"
                                                                                  },25]}]},
                                                 "fourth","fifth"]}]}]}]}
          }},
          {$match:{"quarter":{$ne:"fifth"}}},
          {$sort : {"ticker_dates.date":-1}},
          {$group:{"_id":{"quarter":"$quarter"},"results":{$push:"$ticker_dates"}
        }
        }
    
       ]
      ,
       function(err, result) {
        
        //   console.log("start");
        // console.log("end");

        if (!result) {
          return res.status(400).json({
            status: 400,
            data: result,
            message: "Retrieved dates Successfully",
          });;
        } else {
          if (err) throw err;
          res.status(200).json({
            status: 200,
            data: result,
            message: "Retrieved dates Successfully",
          });
        }
      });
 
    } catch (err) {
      console.log(err)
      next(err);
    }
  });
// });

// getting cash flow

router.get("/:id", async (req, res, next) => {
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
        message: "No news Found",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Retrieved all news Successfully",
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
                      "fourth",
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
      {
        $group: { _id: { quarter: "$quarter" }, results: { $push: "$$ROOT" } },
      },
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
