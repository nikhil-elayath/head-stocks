const express = require("express");
const router = express.Router();
const stocksData = require("../../model/stocksModel");
router.get("/company", async (req, res) => {
  // selecting the database "stocks

  let result = await stocksData.find(
    {},
    { ticker_name: 1, ticker_id: 1, industry: 1, _id: 0, ohlc_dates: 1 }
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
    message: "Retrieved All Companies successfully"
  });
});

router.get("/gainers-and-losers/:sector", async (req, res) => {
  try {
    let sector = req.params.sector;
    let tickerDetails = await stocksData.find(
      { sector: sector, "ticker_dates.1": { $exists: true } },
      { ticker_id: 1, ticker_name: 1, ticker_dates: 1 }
    );
    var gainers = [];
    tickerDetails.forEach(function(elem) {
      let name = { tickerValues: {} };

      var ticker_dates = elem._doc.ticker_dates;
      var ticker_id = elem._doc.ticker_id;
      last_date = ticker_dates.slice(-1)[0];
      var second_last_date = ticker_dates.slice(-2)[0];
      var i = -1;

      while (last_date["Share Price"] == undefined) {
        last_date = ticker_dates.slice(i)[0];
        i--;
      }
      last_date_shareprice = last_date["Share Price"];
      Market_cap = last_date["Market Capitalisation"];

      second_last_date = ticker_dates.slice(-2)[0];
      var second_last_date_shareprice = second_last_date["Share Price"];
      var j = -2;
      while (last_date["Share Price"] == undefined) {
        last_date = ticker_dates.slice(j)[0];
        j--;
      }
      change_shareprice = last_date_shareprice - second_last_date_shareprice;
      name.tickerValues["change_percent"] = (
        (change_shareprice / last_date_shareprice) *
        100
      )
        .toFixed(2)
        .toString();
      if (
        !isNaN(parseFloat(name.tickerValues["change_percent"])) &&
        name.tickerValues["change_percent"] != 0
      ) {
        gainers.push(name);
      }
      if (name.tickerValues["change_percent"].charAt(0) == "-") {
        flag = true;
      } else {
        flag = false;
        name.tickerValues["change_percent"] =
          "+" + name.tickerValues["change_percent"];
      }
      let ticker_name = elem._doc.ticker_name;
      name["ticker_name"] = ticker_name;
      name.tickerValues["Market Cap"] = parseInt(Market_cap).toFixed(2) + "M";
      name.tickerValues["Share Price"] = last_date_shareprice.toString();
      name["ticker_id"] = ticker_id;
    });

    var sorted = gainers;
    sorted = sorted.sort(function(obj1, obj2) {
      return (
        obj2.tickerValues.change_percent - obj1.tickerValues.change_percent
      );
    });
    var losers = sorted;
    let finalData = {};
    finalData.isIndex = false;
    finalData.tableData = sorted;
    losers = losers.reverse();
    res.status(200).json({
      status: 200,
      data: finalData,
      data1: losers,
      message: "Retrieved name of all indexes"
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
