const express = require("express");
const router = express.Router();
const stocksData = require("../../model/stocksModel");

router.get("/singleindex/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await stocksData.find({ ticker_id: +id });
    console.log(result);
    if (!result) {
      res.status(400).json({
        status: 400,
        data: result,
        message: "No Indices Found"
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Retrieved Indices successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/ohlcdata/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await stocksData.find(
      { ticker_id: +id },
      {
        ticker_name: 1,
        _id: 0,
        ticker_dates: {
          $elemMatch: { date: new Date("2017-11-06T00:00:00.000+00:00") }
        }
      }
    );
    if (!result) {
      res.status(400).json({
        status: 400,
        data: result,
        message: "No Data Found"
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Retrieved Data successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
