const express = require("express");
const router = express.Router();
const stocksData = require("../../model/stocksModel");

//gets the search results from database - Harshal
router.post("/search", async (req, res) => {
  let result = await stocksData.find(
    //  search the results in two different attributes
    {
      $or: [
        // finds the value recieved in the industry Key
        { industry: { $regex: req.body.searchInput, $options: "i" } },
        // finds the value recieved in the ticker_name Key
        { ticker_name: { $regex: req.body.searchInput, $options: "i" } }
      ],
      "ticker_dates.Share Price": { $exists: true }
    },
    { ticker_name: 1, ticker_id: 1, industry: 1, _id: 0, ticker_dates: 1 }
  );
  let change = [];
  result.forEach(function(elem) {
    let name = {};

    var ticker_dates = elem._doc.ticker_dates;
    var ticker_name = elem._doc.ticker_name;
    var ticker_id = elem._doc.ticker_id;
    var industry = elem._doc.industry;
    last_date = ticker_dates.slice(-1)[0];
    var i = -1;
    while (last_date["Share Price"] == undefined) {
      last_date = ticker_dates.slice(i)[0];
      i--;
    }
    last_date_shareprice = last_date["Share Price"];
    change.push(name);
    name["ticker_name"] = ticker_name;
    name["ticker_id"] = ticker_id;
    name["industry"] = industry;
    name["price"] = last_date_shareprice;
  });
  if (result.length == 0) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "No Data Found"
    });
  } else {
    // If successfully executes then sends this response to the search action
    res.status(200).json({
      status: 200,
      data: change,
      message: "Retrieved Search Result successfully"
    });
  }
  // } catch (err) {
  //   next(err);
  // }
});

module.exports = router;
