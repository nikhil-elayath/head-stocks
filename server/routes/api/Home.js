const express = require("express");
const router = express.Router();
const newsData = require("../../model/news");
const stocksData = require("../../model/stocksModel");

//geting all news from database - Piyush kumar
router.get("/allnews", async (req, res, next) => {
  try {
    let result = await newsData.find({});
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

//geting news details with an id - Piyush kumar
router.get("/singleNews/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    console.log(id);
    let result = await newsData.find({ new_id: req.params.id });
    if (result < 0) {
      res.status(400).json({
        status: 400,
        data: null,
        message: "No news Found"
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Retrieved news Successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/index", async (req, res, next) => {
  try {
    let tickerDetails = await stocksData.find(
      { isIndex: true },
      { ticker_name: 1, ticker_dates: 1, ticker_id: 1, _id: 0 }
    );
    let change = [];
    tickerDetails.forEach(function(elem) {
      let name = { tickerValues: {} };
      let result = Object.values(elem._doc.ticker_dates);
      last_date_value = result.slice(-1)[0];
      let ticker_name = elem._doc.ticker_name;
      let ticker_id = elem._doc.ticker_id;
      let closing = last_date_value.closing.toFixed(2);
      let opening = last_date_value.opening;
      let percentChange = ((closing - opening) * 100) / opening;
      let obj = {};
      name.tickerValues["change_percent"] = percentChange.toFixed(2).toString();
      if (name.tickerValues["change_percent"].charAt(0) == "-") {
        flag = true;
      } else {
        flag = false;
        name.tickerValues["change_percent"] =
          "+" + name.tickerValues["change_percent"];
      }
      change.push(name);
      name["ticker_name"] = ticker_name;
      name["ticker_id"] = ticker_id;
      name.tickerValues["closing_price"] = closing;
    });
    let finalData = {};
    finalData.isIndex = true;
    finalData.index = change;
    res.status(200).json({
      status: 200,
      data: [finalData],
      message: "Retrieved name of all indexes"
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
