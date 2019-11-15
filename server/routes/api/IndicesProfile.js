const express = require("express");
const router = express.Router();
const stocksData = require("../../model/stocksModel");
//used to provide path for downloadable file
const path = require("path");

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

//provides downloadable format according to the required market index
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

module.exports = router;
