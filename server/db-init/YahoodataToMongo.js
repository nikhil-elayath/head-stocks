/*piyush*/
const pgp = require("pg-promise")();
const db = pgp("postgres://postgres:root@localhost:5432/Stocks");
// var MongoClient = require("mongodb").MongoClient;
const stocksData = require("./models/stocksModel");

const tickerName = [];
async function getTickerNames() {
  let finalData = {};
  const tickerQuery = `select distinct("Ticker") from "stockBazaar" order by "Ticker" limit 2`;
  var i = 1;
  let tickerNameResult = await db.any(tickerQuery);
  //  .then(async data => {
  tickerNameResult.forEach(async current_ticker => {
    // Distinct ticker names in this array
    tickerName.push(current_ticker.Ticker);
  });
  console.log("Done Pushing ticker names");
  // For each ticker name find date and indicator names
  // tickerName.forEach(async ticker => {
  for (ticker of tickerName) {
    let tickerObject = {};
    tickerObject._id = i;
    tickerObject.tdate = {};
    tickerObject.sector = "";
    tickerObject.isIndex = false;
    tickerObject.industry = "";
    tickerObject.tname = ticker;
    // Declaring date for selected ticker name
    let indicator_date = [];
    const indicatorDates = `select distinct("date") from "stockBazaar" where "Ticker" = '${ticker}' order by "date"`;
    const res = await db.any(indicatorDates);
    // Pushing dates into array for that ticker name
    // res.forEach(result => {
    for (result of res) {
      var formatedDate = new Date(result["date"]);
      formatedDate = formatedDate.toISOString().substring(0, 10);
      indicator_date.push(formatedDate);
    }
    // });
    // Iterating with indicator names and ticker name for date and corresponding value
    // indicator_date.forEach(async current_indicator_date => {
    for (current_indicator_date of indicator_date) {
      const getTickerValues = `select "Indicator Name","Indicator Value" from "stockBazaar" where "Ticker"='${ticker}' and "date"='${current_indicator_date}';`;
      const f_res = await db.any(getTickerValues);
      d = current_indicator_date;

      if (f_res.length > 0) {
        tickerObject.tdate[`${current_indicator_date}`] = {};
        f_res.forEach(f_result => {
          if (f_result.hasOwnProperty("Indicator Value")) {
            tickerObject.tdate[`${current_indicator_date}`][
              `${f_result["Indicator Name"]}`
            ] = parseFloat(f_result["Indicator Value"]);
          }
        });
      }
      finalData = await rewriteProperties(tickerObject);
    }
    stocksData.insertMany({ finalData }, stocksData);
    // MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    //   if (err) throw err;
    //   else {
    //     let database = client.db("mongoStocks");
    //     // datab = database;
    //     console.log("Connected to MongoDB");
    //     database.collection("stocks").insert(finalData, function(err, res) {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log("success");
    //       }
    //     });
    i++;

    //   }
    // });

    console.log(finalData);
  }
}
function rewriteProperties(obj) {
  if (typeof obj !== "object") return obj;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      obj[prop.replace(/\./g, " ")] = rewriteProperties(obj[prop]);
      if (prop.indexOf(".") > -1) {
        delete obj[prop];
      }
    }
  }
  return obj;
}

getTickerNames();
