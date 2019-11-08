const express = require("express");
const router = express.Router();
const stocksData = require("../../model/stocksModel");

//gets the search results from database - Harshal
router.post("/search", async (req, res) => {
  // selecting the database "stocks

  let result = await stocksData.find(
    //  search the results in two different attributes
    {
      $or: [
        { industry: req.body.searchInput },
        { ticker_name: { $regex: req.body.searchInput, $options: "i" } }
      ]
    },
    { ticker_name: 1, ticker_id: 1, industry: 1, _id: 0 }
  );

  if (result < 0) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "No Data Found"
    });
  }
  // If successfully executes then sends this response to the search action
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved Search Result successfully"
  });
});
module.exports = router;
