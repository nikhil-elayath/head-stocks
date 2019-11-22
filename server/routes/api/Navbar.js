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

//updates the company data - Harshal

// file system - to store and read the uploaded file
const fs = require("fs");
// // to accept the uploaded file from the frontend
const multer = require("multer");
// // to access the values stored in the file
const csv = require("csv-parse");
// // converts csv data to independent string values
const csvtojson = require("csvtojson");
// // uploads the file to the directory
var upload = multer({ dest: "uploads/" });
router.post("/updateCompany", upload.single("file"), async (req, res) => {
  // router.post("/updateCompany/:id", upload.single("file"), async (req, res) => {
  // stores the Id of the Company that is recieved from params
  // let id = req.params.id;

  // console.log(req.file);

  var file = req.file;
  // var indicatorName = true;
  var date_present = false;
  let dateFormated = null;
  var newObj = [];

  console.log("Start");
  fs.createReadStream(file.path)
    .pipe(csv())
    .on("data", function(data) {
      if (csvtojson(data).params[0] === "date") {
        // to check if data is present for the given date
        // console.log("found date");
        dateFormated = new Date(csvtojson(data).params[1]);
        // console.log(dateFormated);
        // query to search data for date in database
        let datefound = 0;
        // stocksData.find({
        //   "$ticker_dates.date": +dateFormated
        // });
        if (datefound != 0) {
          // if date present
          // console.log(datefound);
          date_present = true;
        }
      }
      if (date_present === false) {
        let mykey = csvtojson(data).params[0];
        // console.log(mykey);

        let myvalue = csvtojson(data).params[1];
        // let doc = { mykey: myvalue };
        let doc = {};
        doc[`${mykey}`] = myvalue;

        // doc.push(csvtojson(data).params[0], csvtojson(data).params[0]);
        // console.log(
        //   csvtojson(data).params[0] + "," + csvtojson(data).params[1]
        // );
        newObj.push(doc);

        // console.log(doc);
      }

      // var i;
      // for (i = 0; i < data.length; i++) {
      //   // console.log(i);

      //   if (indicatorName === true) {
      //     // console.log(indicatorName);
      //     indicatorName = false;

      //     // console.log(
      //     //   csvtojson(data).params[i] + "," + csvtojson(data).params[i + 1]
      //     // );
      //     // add the
      //     // newObj.push(csvtojson(data).params);
      //   } else {
      //     // console.log(indicatorName);
      //     indicatorName = true;
      //     // console.log(csvtojson(data).params[i]);
      //   }
      // }
      // newObj.push(data);
      // console.log(data.length);
      // console.log(data)

      // console.log("3");
      // prints the row data key,value
      // csvData = data.toString("utf8");
      // console.log(csvData);

      // first and second element of row
      // console.log(data[1]);

      // if (dateFormated != null) {
      //   console.log(typeof dateFormated);
      // }

      // Path of the file
      // console.log(file.path)
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      console.log(newObj);
    });
});

module.exports = router;
