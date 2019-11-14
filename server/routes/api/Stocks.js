const express = require("express");
const router = express.Router();
const stocksData = require("../../model/stocksModel");
// router.get("/company", async (req, res) => {
// selecting the database stocks
// let result = await stocksData.find(
//   {},
//   {
//     ticker_name: 1,
//     ticker_id: 1,
//     sector: 1,
//     industry: 1,
//     _id: 0,
//     ohlc_dates: 1
//   }
// );

// if (result < 0) {
//   res.status(400).json({
//     status: 400,
//     data: null,
//     message: "No Company Found"
//   });
// }
// If successfully executes then sends this response to the search action
//   res.status(200).json({
//     status: 200,
//     data: result,
//     message: "Retrieved All Companies Successfully"
//   });
// });
// module.exports = router;

//get companies by industries
router.get("/companies/:industry", async (req, res, next) => {
  console.log("companies by industry called");
  try {
    let industry = req.params.industry;
    console.log("industry is", industry);
    let result = await stocksData.find(
      { industry: industry },
      { ticker_id: 1, ticker_name: 1, industry: 1, _id: 0 }
    );

    console.log("companies by industry:", result);
    if (result < 0) {
      res.status(400).json({
        status: 400,
        data: result,
        message: "No Company Found"
      });
    } else {
      // If successfully executes then sends this response to the search action
      res.status(200).json({
        status: 200,
        data: result,
        message: "Retrieved all Companies Successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;

//getting all the company sectors
router.get("/companysectors", async (req, res) => {
  let result = await stocksData.distinct("sector", {
    sector: { $exists: true }
  });

  if (result < 0) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "No Sector Found"
    });
  }
  // If successfully executes then sends this response to the search action
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved All Sectors Successfully"
  });
});
module.exports = router;

//gainers and losers based on sector
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
    var reverse = [];
    for (i = losers.length - 1; i > losers.length - 11; i--) {
      reverse.push(losers[i]);
    }
    let finalData = {};
    finalData.isIndex = false;
    finalData.gainers = sorted.slice(0, 10);
    finalData.losers = reverse;
    res.status(200).json({
      status: 200,
      data: [finalData],
      message: "Retrieved name of all indexes"
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

//getting all the industries based on a sector
router.get("/industries/:sector", async (req, res, next) => {
  console.log("industries by sector called");
  try {
    let sector = req.params.sector;
    console.log("sector is", sector);
    let result = await stocksData
      .find({ sector: sector }, "industry")
      .distinct("industry");
    console.log("industries by sector:", result);
    if (result < 0) {
      res.status(400).json({
        status: 400,
        data: result,
        message: "No Industry Found"
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Retrieved all Industries Successfully"
      });
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
