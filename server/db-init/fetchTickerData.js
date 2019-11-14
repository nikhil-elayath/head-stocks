var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var fs = require("fs");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "stocks";
mongoClient.connect(url,async function(err, db){
    console.log("Connected successfully to server");
  const dbo = db.db(dbName);
  
    var collection = dbo.collection("stocks_data_2");
  //  const result=await  collection.find({ticker_name: 'AAPL',"ticker_dates":{'$elemMatch': {date: new Date("2019-03-31")}}}).toArray();
  //  console.log(JSON.stringify(result));

   const res = await collection.aggregate([
      {$unwind : "$ticker_dates"},
      {$match : {
        ticker_name : "AAPL"
        // ,
        // 'ticker_dates.date' : {
        //   $lte : new Date("2019-12-31"),
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
      {$group:{"_id":{"quarter":"$quarter"},"results":{$push:"$ticker_dates"}
    }
    }

   ]).toArray();
   console.log(JSON.stringify(res))
})