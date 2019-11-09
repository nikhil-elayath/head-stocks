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

module.exports = router;
