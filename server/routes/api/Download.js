const express = require("express");
const router = express.Router();
let converter = require("json-2-csv");

// APi for doenload reports - Piyush [20/11/19]
// router.post("/report", async (req, res, next) => {
//   try {
//     let document = req.body.reports;
//     console.log(req);
//     let csv_options = {
//       delimiter: {
//         wrap: '"', //Doudle quote(") character
//         field: ",", //Comma field delimiter
//         eol: "\n" //Newline delimiter
//       },
//       prependHeader: true,
//       sortHeader: false,
//       excelBOM: true,
//       trimHeaderValues: true,
//       trimFieldValues: true
//     };
//     let json2CSVCallBack = function(err, csv_data) {
//       if (err) console.log(err);
//       res.send(csv_data);
//     };
//     converter.json2csv(document, json2CSVCallBack, csv_options);
//   } catch (err) {
//     next(err);
//   }
// });
module.exports = router;
