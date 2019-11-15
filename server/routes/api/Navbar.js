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
      data: result,
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


//updates the company data - Harshal

// file system - to store and read the uploaded file
const fs = require("fs");
// to accept the uploaded file from the frontend
const multer = require("multer");
// to access the values stored in the file
const csv = require("csv-parse");
// converts csv data to independent string values 
const csvtojson = require("csvtojson");
// uploads the file to the directory
var upload= multer({dest: 'uploads/'})
router.post("/updateCompany", upload.single('file'), async (req, res) => {
  // console.log(req.file)
  
  var file = req.file
  fs.createReadStream(file.path).pipe(csv()).on('data', function (data) {
    var i;
    for (i = 0; i < data.length; i++) {
    console.log(i);
      console.log(csvtojson(data).params[i])
    }

    // csvData = data.toString('utf8');
    // console.log(csvData);
    // console.log(data[0])
    // console.log(data[1])
    // console.log(file.path)

  })
  
});

module.exports = router;
