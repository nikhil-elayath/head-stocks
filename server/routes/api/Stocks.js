const express = require("express");
const router = express.Router();
const stocksData = require("../../model/stocksModel");
router.get("/company", async (req, res) => {
  // selecting the database "stocks
  let result = await stocksData.find(
    {},
    {
      ticker_name: 1,
      ticker_id: 1,
      sector: 1,
      industry: 1,
      _id: 0,
      ohlc_dates: 1
    }
  );

  if (result < 0) {
    res.status(400).json({
      status: 400,
      data: null,
      message: "No Company Found"
    });
  }
  // If successfully executes then sends this response to the search action
  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved All Companies Successfully"
  });
});
module.exports = router;

//get companies by industries
router.get("/companies/:industry", async (req, res, next) => {
  console.log("companies by industry called");
  try {
    let industry = req.params.industry;
    console.log("industry is", industry);
    let result = await stocksData
      .find({ industry: industry }, { ticker_name: 1, industry: 1, _id: 0 })
      .limit(5);

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

//getting all the company sectors
router.get("/companysectors", async (req, res) => {
  let result = await stocksData.distinct("sector");

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

//getting industries by sector
router.get("/industries/:sector", async (req, res, next) => {
  console.log("industries by sector called");
  try {
    let sector = req.params.sector;
    console.log("sector is", sector);
    let result = await stocksData
      .find(
        { sector: sector },
        { ticker_name: 1, sector: 1, industry: 1, _id: 0 }
      )
      .limit(5);

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
