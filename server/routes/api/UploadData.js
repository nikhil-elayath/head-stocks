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
// // converts csv data to independent string values
// const csvtojson = require("csvtojson");

// // uploads the file to the directory
// var upload = multer({ dest: "uploadedFiles/" });
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploadedFiles/");
  },
  filename: function(req, file, cb) {
    cb(null, "File" + Date.now());
  }
});

var upload = multer({ storage: storage });

router.post("/updateCompany/:id", upload.single("file"), async (req, res) => {
  // stores the Id of the Company that is recieved from params
  let idResult = await stocksData.find({ ticker_id: +id });

  if (idResult.length != 0) {
    var file = req.file;
    if (file.originalname.split(".")[1] !== "csv") {
      return callback(new Error("Only csv files allowed!"));
    }
    var date_present = false;
    var newObj = {};
    var countOfData = 0;

    // console.log("Start");
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", async function(data) {
        if (data[0] === "date") {
          // console.log("fs 1");
          countOfData = data.length;
          // console.log(countOfData);
        }
      })
      .on("end", () => {
        for (let i = 1; i < countOfData; i++) {
          // console.log("fs 2");

          fs.createReadStream(file.path)
            .pipe(csv())
            .on("data", async function(data) {
              // console.log(data.length);

              if (data[0] === "date") {
                // to check if data is present for the given date
                var dateFormated = new Date(data[i]);
                // console.log(dateFormated);

                // query to search data for date in database
                let datefound = await stocksData.aggregate([
                  { $unwind: "$ticker_dates" },
                  {
                    $match: {
                      $and: [
                        { ticker_id: +id },
                        {
                          "ticker_dates.date": dateFormated
                        }
                      ]
                    }
                  },
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

                // console.log(datefound);
                if (datefound.length > 0) {
                  // if date present
                  date_present = true;
                  console.log("Data already exists for " + dateFormated);
                }
              }
              if (date_present == false) {
                let mykey = data[0];
                let myvalue = null;

                if (data[0] === "date") {
                  myvalue = new Date(data[i]);
                } else {
                  myvalue = parseFloat(data[i]);
                }

                newObj[`${mykey}`] = myvalue;
              }
              if (newObj.hasOwnProperty("date")) {
                // console.log("Created Object");
                // console.log(newObj);
                // console.log("CSV file successfully processed");

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

    res.status(200).json({
      status: 200,
      data: null,
      message: "Updated Data Successfully"
    });
  } else {
    res.status(400).json({
      status: 400,
      data: null,
      message: "No companies found"
    });
  }
});

module.exports = router;
