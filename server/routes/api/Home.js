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

router.get("/index", async (req, res) => {
  try {
    let result = await stocksData.find({ isIndex: true });
    if (result < 0) {
      res.status(400).json({
        status: 400,
        data: result,
        message: "No indices Found"
      });
    }
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved all Indices Successfully"
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
