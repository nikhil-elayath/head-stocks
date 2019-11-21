const express = require("express");
const router = express.Router();
const stocksData = require("../../model/stocksModel");

//gets the search results from database - Harshal
router.post("/search", async (req, res) => {
  // selecting the database "stocks
  // try {
  let result = await stocksData.find(
    //  search the results in two different attributes
    {
      $or: [
        // finds the value recieved in the industry Key
        { industry: { $regex: req.body.searchInput, $options: "i" } },
        // finds the value recieved in the ticker_name Key
        { ticker_name: { $regex: req.body.searchInput, $options: "i" } }
      ]
    },
    { ticker_name: 1, ticker_id: 1, industry: 1, _id: 0 }
  );
  // If result not found sends this as response
  if (result.length == 0) {
    res.status(400).json({
      status: 400,
      data: result,
      message: "No Data Found"
    });
  } else {
    // If successfully executes then sends this response to the search action
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved Search Result successfully"
    });
  }
  // } catch (err) {
  //   next(err);
  // }
});

module.exports = router;
