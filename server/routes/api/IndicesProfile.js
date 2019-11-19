const express = require("express");
const router = express.Router();
const stocksData = require("../../model/stocksModel");
//used to provide path for downloadable file[piyush]
const path = require("path");

router.get("/singleindex/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await stocksData.find({ ticker_id: +id });
    let change = [];
    result.forEach(function(elem) {
      let name = {};
      let result = Object.values(elem._doc.ticker_dates);
      last_date_value = result.slice(-1)[0];
      let ticker_name = elem._doc.ticker_name;
      let ticker_id = elem._doc.ticker_id;
      let closing = last_date_value.closing.toFixed(2);
      let opening = last_date_value.opening.toFixed(2);
      let adjclose = last_date_value.adjclose.toFixed(2);
      let high = last_date_value.high.toFixed(2);
      let low = last_date_value.low.toFixed(2);
      let percentChange = ((closing - opening) * 100) / opening;
      name["change_percent"] = percentChange.toFixed(2).toString();
      if (name["change_percent"].charAt(0) == "-") {
        flag = true;
      } else {
        flag = false;
        name["change_percent"] = "+" + name["change_percent"];
      }
      change.push(name);
      name["date"] = last_date_value.date;
      name["ticker_name"] = ticker_name;
      name["ticker_id"] = ticker_id;
      name["close"] = closing;
      name["open"] = opening;
      name["adjclose"] = adjclose;
      name["high"] = high;
      name["low"] = low;
    });
    if (result.length == 0) {
      res.status(400).json({
        status: 400,
        data: null,
        message: "No Indices Found"
      });
    } else {
      res.status(200).json({
        status: 200,
        data: change,
        message: "Retrieved Indices successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});

//provides downloadable format according to the required market index[piyush]
router.get("/download/:index", async (req, res, next) => {
  const index = req.params.index;
  res.download(
    path.join(
      __dirname,
      "../../db-init/stock-data/yahoo-data/index/^" + index + ".csv"
    ),
    function(err) {
      console.log(err);
    }
  );
});

router.post("/ohlcdata/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    console.log(id);
    console.log(req.body.time);
    var index = [];
    if (req.body.time == "1w") {
      var result = await stocksData.aggregate([
        { $unwind: "$ticker_dates" },
        {
          $match: {
            ticker_id: +id,
            "ticker_dates.date": {
              $lte: new Date("2019-11-05"),
              $gte: new Date("2019-10-24")
            }
          }
        }
      ]);
    }

    if (req.body.time == "1m") {
      var result = await stocksData.aggregate([
        { $unwind: "$ticker_dates" },
        {
          $match: {
            ticker_id: +id,
            "ticker_dates.date": {
              $lte: new Date("2019-11-05"),
              $gte: new Date("2019-09-12")
            }
          }
        }
      ]);
    }
    result.forEach(function(elem) {
      let name = {};
      var ticker_dates = elem.ticker_dates;
      name["open"] = ticker_dates.opening.toFixed(2);
      name["high"] = ticker_dates.high.toFixed(2);
      name["low"] = ticker_dates.low.toFixed(2);
      name["close"] = ticker_dates.closing.toFixed(2);
      name["adjclose"] = ticker_dates.adjclose.toFixed(2);
      name["volume"] = ticker_dates.volume.toFixed(2);
      name["date"] = ticker_dates.date;
      index.push(name);
    });
    var index1 = [];
    index1 = index.reverse();
    if (result.length == 0) {
      res.status(400).json({
        status: 400,
        data: result,
        message: "No Data Found"
      });
    } else {
      res.status(200).json({
        status: 200,
        data: [index1],
        message: "Retrieved Data successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
