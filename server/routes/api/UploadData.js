const express = require("express");
const router = express.Router();
const stocksData = require("../../model/stocksModel");

//updates the company data - Harshal

// file system - to store and read the uploaded file
const fs = require("fs");
// // to accept the uploaded file from the frontend
const multer = require("multer");
// // to access the values stored in the file
const csv = require("csv-parse");

// // uploads the file to the directory
var storage = multer.diskStorage({
  // stores the file in the folder
  destination: function(req, file, cb) {
    cb(null, "uploadedFiles/");
  },
  // renaming the recieved file
  filename: function(req, file, cb) {
    cb(null, "File" + Date.now());
  }
});
var upload = multer({ storage: storage });

// Uploading the csv file and inserting the data
router.post("/updateCompany/:id", upload.single("file"), async (req, res) => {
  // stores the Id of the Company that is recieved from params
  let id = req.params.id;
  // finds the data for the recieved Id
  let idResult = await stocksData.find({ ticker_id: +id });
  // checks if result found or not
  if (idResult.length !== 0) {
    // executes if result found

    // stores the recieved file
    var file = req.file;
    // checks file type is csv is not
    if (file.originalname.split(".")[1] !== "csv") {
      return callback(new Error("Only csv files allowed!"));
    }
    var date_present = false;
    var newObj = {};
    var countOfData = 0;

    // reading the recieved csv file
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", async function(data) {
        // checks the count of data for dates present in the file
        if (data[0] === "date") {
          countOfData = data.length;
        }
      })
      // inserting the data in database
      .on("end", () => {
        // iterates through all the data available in file
        for (let i = 1; i < countOfData; i++) {
          // reads the file again to access the  data and values
          fs.createReadStream(file.path)
            .pipe(csv())
            .on("data", async function(data) {
              if (data[0] === "date") {
                // to check if data is present for the given date
                var dateFormated = new Date(data[i]);

                // query to search data for date in database
                let datefound = await stocksData.aggregate([
                  { $unwind: "$ticker_dates" },
                  {
                    $match: {
                      $and: [
                        // search by ticker_id
                        { ticker_id: +id },
                        // search by date found in file
                        {
                          "ticker_dates.date": dateFormated
                        }
                      ]
                    }
                  },
                  // get only the data of ticker_dates from the database
                  {
                    $project: { ticker_dates: 1 }
                  },
                  {
                    $group: {
                      // _id is used for string the year and month of the data of each quarter distinctly.
                      _id: {
                        // $dayOfMonth of the quarter is extracted and stored
                        day: { $dayOfMonth: "$ticker_dates.date" },

                        // Month of the quarter is extracted and stored
                        month: { $month: "$ticker_dates.date" },

                        // Year of the quarter is extracted and stored
                        year: { $year: "$ticker_dates.date" }
                      },
                      date_values: { $push: "$ticker_dates" }
                    }
                  }
                ]);

                if (datefound.length > 0) {
                  // if date present
                  date_present = true;
                  console.log("Data already exists for " + dateFormated);
                }
              }
              // if data for date not present
              if (date_present == false) {
                // stores the indicator name
                let mykey = data[0];

                let myvalue = null;

                // stores the indicator value
                if (data[0] === "date") {
                  // converts date
                  myvalue = new Date(data[i]);
                } else {
                  // converts value to float
                  myvalue = parseFloat(data[i]);
                }

                // adds key value pairs to the declared object
                newObj[`${mykey}`] = myvalue;
              }
              // checks if the property date present
              if (newObj.hasOwnProperty("date")) {
                // Updates the data in the database
                stocksData.updateOne(
                  { ticker_id: +id },
                  {
                    $push: {
                      ticker_dates: newObj
                    }
                  },
                  function(err, res) {
                    if (err) throw err;
                    console.log("Data Updated for" + i);
                  }
                );
              }
            });
        }
      });
    // on successfull execution of route
    res.status(200).json({
      status: 200,
      data: null,
      message: "Updated Data Successfully"
    });
  } else {
    // if Error occured in route
    res.status(400).json({
      status: 400,
      data: null,
      message: "No companies found"
    });
  }
});

module.exports = router;
